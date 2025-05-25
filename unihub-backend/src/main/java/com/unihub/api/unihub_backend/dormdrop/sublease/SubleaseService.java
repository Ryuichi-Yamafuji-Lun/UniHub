package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

@Service
public class SubleaseService {
    
    private final SubleaseRepository subleaseRepository;
    private final AccountRepository accountRepository;

    public SubleaseService(SubleaseRepository subleaseRepository, AccountRepository accountRepository) {
        this.subleaseRepository = subleaseRepository;
        this.accountRepository = accountRepository;
    }

    // check if account is active
    private void validateAccount(Account account) {
        if (!account.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalArgumentException("Account is invalid");
        }
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfSublease(Sublease sublease, Account account) {
        return sublease.getAccount().equals(account);
    }

    // create sublease
    @Transactional
    public Sublease createSublease(Sublease sublease, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Create Sublease: account not found"));

        validateAccount(account);

        // do a double take on accound and date posted
        sublease.setAccount(account);
        sublease.setDatePosted(LocalDate.now());
        
        return subleaseRepository.save(sublease);
    }

    // delete sublease
    @Transactional
    public void deleteSubLease(Long subleaseId, Long accountId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Delete Sublease: account not found"));

        if (!isOwnerOfSublease(sublease, account)) {
            throw new IllegalArgumentException("You are not authorized to delete this listing");
        }

        subleaseRepository.delete(sublease);
    }

    // update sublease
    @Transactional
    public Sublease updateSublease(Long subleaseId, Sublease updatedSublease, Long accountId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Update Sublease: account not found"));

        if (!isOwnerOfSublease(sublease, account)) {
            throw new IllegalArgumentException("You are not authorized to update this sublease");
        }

        sublease.setLeaseName(updatedSublease.getLeaseName());
        sublease.setLeaseStartDate(updatedSublease.getLeaseStartDate());
        sublease.setLeaseEndDate(updatedSublease.getLeaseEndDate());
        sublease.setAmenities(updatedSublease.getAmenities());
        sublease.setLeasePrice(updatedSublease.getLeasePrice());
        sublease.setRoomType(updatedSublease.getRoomType());
        sublease.setLeaseImage(updatedSublease.getLeaseImage());
        sublease.setLeaseDescription(updatedSublease.getLeaseDescription());
        sublease.setLeaseAddress(updatedSublease.getLeaseAddress());
        sublease.setLongitude(updatedSublease.getLongitude());
        sublease.setLatitude(updatedSublease.getLatitude());
        sublease.setLeaseSchool(updatedSublease.getLeaseSchool());

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
    public List<Sublease> getSubleaseByAccount(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Get all Owned Sublease: account not found"));
        return subleaseRepository.findByAccount(account);      
    }

    @Transactional(readOnly = true)
    public List<Sublease> getSubleaseByAccountOrderedByDate(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Get all Owned Sublease Ordered: account not found"));
        return subleaseRepository.findByAccountOrderByDatePostedDesc(account);
    }
}
