package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseRegistrationRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseResponseDTO;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseUpdateRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.mapper.SubleaseMapper;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

@Service
public class SubleaseService {
    
    private final SubleaseRepository subleaseRepository;
    private final AccountRepository accountRepository;
    private final SubleaseMapper subleaseMapper;

    public SubleaseService(SubleaseRepository subleaseRepository, AccountRepository accountRepository, SubleaseMapper subleaseMapper) {
        this.subleaseRepository = subleaseRepository;
        this.accountRepository = accountRepository;
        this.subleaseMapper = subleaseMapper;
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private Account getCurrentUserAccount() {
        Account account =  accountRepository.findByEmail(getCurrentUserEmail()).orElseThrow(() -> new RuntimeException("Autenticated account not found"));

        // check if Account is active
        if (!account.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalArgumentException("Account is invalid");
        }

        return account;
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfSublease(Sublease sublease, Account account) {
        return sublease.getAccount().equals(account);
    }

    // create sublease
    @Transactional
    public Sublease createSublease(SubleaseRegistrationRequest request) {
        Account account = getCurrentUserAccount();

        // do a double take on accound and date posted
        Sublease sublease = subleaseMapper.fromRegistrationRequest(request);
        sublease.setAccount(account);
        sublease.setDatePosted(LocalDate.now());
        
        return subleaseRepository.save(sublease);
    }

    // delete sublease
    @Transactional
    public void deleteSubLease(Long subleaseId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = getCurrentUserAccount();

        if (!isOwnerOfSublease(sublease, account)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized: not your listing");
        }

        subleaseRepository.delete(sublease);
    }

    // update sublease
    @Transactional
    public Sublease updateSublease(Long subleaseId, SubleaseUpdateRequest updatedSublease) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = getCurrentUserAccount();

        if (!isOwnerOfSublease(sublease, account)) {
            throw new IllegalArgumentException("You are not authorized to update this sublease");
        }

        if (updatedSublease.getLeaseName() != null) sublease.setLeaseName(updatedSublease.getLeaseName());
        if (updatedSublease.getLeaseStartDate() != null) sublease.setLeaseStartDate(updatedSublease.getLeaseStartDate());
        if (updatedSublease.getLeaseEndDate() != null) sublease.setLeaseEndDate(updatedSublease.getLeaseEndDate());
        if (updatedSublease.getAmenities() != null) sublease.setAmenities(updatedSublease.getAmenities());
        if (updatedSublease.getLeasePrice() != null) sublease.setLeasePrice(updatedSublease.getLeasePrice());
        if (updatedSublease.getRoomType() != null) sublease.setRoomType(updatedSublease.getRoomType());
        if (updatedSublease.getLeaseImage() != null) sublease.setLeaseImage(updatedSublease.getLeaseImage());
        if (updatedSublease.getLeaseDescription() != null) sublease.setLeaseDescription(updatedSublease.getLeaseDescription());
        if (updatedSublease.getLeaseAddress() != null) sublease.setLeaseAddress(updatedSublease.getLeaseAddress());
        if (updatedSublease.getLongitude() != null) sublease.setLongitude(updatedSublease.getLongitude());
        if (updatedSublease.getLatitude() != null) sublease.setLatitude(updatedSublease.getLatitude());
        if (updatedSublease.getLeaseSchool() != null) sublease.setLeaseSchool(updatedSublease.getLeaseSchool());
        if (updatedSublease.getRoomWidth() != null) sublease.setRoomWidth(updatedSublease.getRoomWidth());
        if (updatedSublease.getRoomDepth() != null) sublease.setRoomDepth(updatedSublease.getRoomDepth());

        return subleaseRepository.save(sublease);
    }

    /*
     * PUBLIC USER ACCESS
     * findSubleaseById (finds specific sublease by sublease id)
     * searchSublease (finds sublease within a perimeter)
     */

    @Transactional(readOnly = true)
    public List<Sublease> getAllSublease() {
        return subleaseRepository.findAllByOrderByDatePostedDesc();
    }
    @Transactional(readOnly = true)
    public Optional<Sublease> findSubleaseById(Long id) {
        return subleaseRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Sublease> searchSublease(Double maxPrice, Double latMin, Double latMax, Double lngMin, Double lngMax, Double widthMin, Double widthMax, Double depthMin, Double depthMax, String leaseName, Set<SubleaseAmenity> requiredAmenities) {
        if (maxPrice == null || maxPrice <= 0) maxPrice = Double.MAX_VALUE;
        if (latMin == null) latMin = -90.0;
        if (latMax == null) latMax = 90.0;
        if (lngMin == null) lngMin = -180.0;
        if (lngMax == null) lngMax = 180.0;
        if (widthMin == null) widthMin = 0.0;
        if (widthMax == null || widthMax < widthMin) widthMax = widthMin;
        if (depthMin == null) depthMin = 0.0;
        if (depthMax == null || depthMax < depthMin) depthMax = depthMin;

        List<Sublease> results = subleaseRepository.searchWithOptionalNameAndLocation(maxPrice, latMin, latMax, lngMin, lngMax, widthMin, widthMax, depthMin, depthMax, leaseName);

        // Filter by amenities
        if (requiredAmenities != null && !requiredAmenities.isEmpty()) {
            results = results.stream()
                .filter(s -> s.getAmenities().containsAll(requiredAmenities))
                .toList();
        }
    
        return results;
    }

    /*
     * OWNER SUBLEASE ACCESS
     */

    @Transactional(readOnly = true)
    public List<SubleaseResponseDTO> getSubleaseByAccountOrderedByDate() {
        Account account = getCurrentUserAccount();

        List<Sublease> subleases = subleaseRepository.findByAccountOrderByDatePostedDesc(account);

        return subleases.stream().map(subleaseMapper::toResponse).toList();
    }
}
