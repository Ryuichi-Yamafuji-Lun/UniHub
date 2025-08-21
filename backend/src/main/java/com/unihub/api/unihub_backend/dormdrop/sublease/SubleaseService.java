package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseRegistrationRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseResponseDTO;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseUpdateRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.mapper.SubleaseMapper;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseRoomType;
import com.unihub.api.unihub_backend.security.utils.CurrentAccountProvider;
import com.unihub.api.unihub_backend.service.S3Service;

@Service
public class SubleaseService {
    
    private final SubleaseRepository subleaseRepository;
    private final SubleaseMapper subleaseMapper;
    private final CurrentAccountProvider currentAccountProvider;
    private final S3Service s3Service;
    private final SubleaseImageRepository subleaseImageRepository;

    public SubleaseService(SubleaseRepository subleaseRepository, SubleaseMapper subleaseMapper, CurrentAccountProvider currentAccountProvider, S3Service s3Service, SubleaseImageRepository subleaseImageRepository) {
        this.subleaseRepository = subleaseRepository;
        this.subleaseMapper = subleaseMapper;
        this.currentAccountProvider = currentAccountProvider;
        this.s3Service = s3Service;
        this.subleaseImageRepository = subleaseImageRepository;
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfSublease(Sublease sublease, Account account) {
        return sublease.getAccount().equals(account);
    }

    // create sublease
    @Transactional
    public Sublease createSublease(SubleaseRegistrationRequest request, List<MultipartFile> files) throws IOException {
        Account account = currentAccountProvider.getCurrentUserAccount();

        Sublease sublease = subleaseMapper.fromRegistrationRequest(request);
        sublease.setAccount(account);
        sublease.setDatePosted(LocalDate.now());

        for (int i = 0; i < files.size(); ++i) {
            MultipartFile file = files.get(i);

            if (!file.isEmpty()) {
                String key = "sublease-images/" + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
                String imageUrl = s3Service.uploadFile(key, file.getBytes());

                SubleaseImage image = new SubleaseImage();
                image.setImageUrl(imageUrl);
                image.setSublease(sublease);
                image.setImagePosition(i);

                sublease.getLeaseImages().add(image);
            }
        }
        
        return subleaseRepository.save(sublease);
    }

    // delete sublease
    @Transactional
    public void deleteSubLease(Long subleaseId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = currentAccountProvider.getCurrentUserAccount();;

        if (!isOwnerOfSublease(sublease, account)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized: not your listing");
        }

        subleaseRepository.delete(sublease);
    }

    // update sublease
    @Transactional
    public Sublease updateSublease(Long subleaseId, SubleaseUpdateRequest updatedSublease) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = currentAccountProvider.getCurrentUserAccount();;

        if (!isOwnerOfSublease(sublease, account)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this sublease");
        }

        if (updatedSublease.getLeaseName() != null) sublease.setLeaseName(updatedSublease.getLeaseName());
        if (updatedSublease.getLeaseStartDate() != null) sublease.setLeaseStartDate(updatedSublease.getLeaseStartDate());
        if (updatedSublease.getLeaseEndDate() != null) sublease.setLeaseEndDate(updatedSublease.getLeaseEndDate());
        if (updatedSublease.getAmenities() != null) sublease.setAmenities(updatedSublease.getAmenities());
        if (updatedSublease.getRoomType() != null) sublease.setRoomType(updatedSublease.getRoomType());
        if (updatedSublease.getLeasePrice() != null) sublease.setLeasePrice(updatedSublease.getLeasePrice());
        if (updatedSublease.getNumRoom() != null) sublease.setNumRoom(updatedSublease.getNumRoom());
        if (updatedSublease.getNumBath() != null) sublease.setNumBath(updatedSublease.getNumBath());
        if (updatedSublease.getLeaseDescription() != null) sublease.setLeaseDescription(updatedSublease.getLeaseDescription());
        if (updatedSublease.getLeaseAddress() != null) sublease.setLeaseAddress(updatedSublease.getLeaseAddress());
        if (updatedSublease.getLongitude() != null) sublease.setLongitude(updatedSublease.getLongitude());
        if (updatedSublease.getLatitude() != null) sublease.setLatitude(updatedSublease.getLatitude());
        if (updatedSublease.getLeaseSchool() != null) sublease.setLeaseSchool(updatedSublease.getLeaseSchool());
        if (updatedSublease.getRoomWidth() != null) sublease.setRoomWidth(updatedSublease.getRoomWidth());
        if (updatedSublease.getRoomDepth() != null) sublease.setRoomDepth(updatedSublease.getRoomDepth());

        return subleaseRepository.save(sublease);
    }

    @Transactional
    public Sublease replaceSubleaseImage(Long subleaseId, Long imageId, MultipartFile newFile) throws IOException {
        Sublease sublease = subleaseRepository.findById(subleaseId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sublease not found"));
        Account account = currentAccountProvider.getCurrentUserAccount();
        if (!isOwnerOfSublease(sublease, account)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");
        }

        SubleaseImage oldImage = subleaseImageRepository.findById(imageId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found"));
        if (!oldImage.getSublease().getId().equals(subleaseId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image does not belong to this sublease");
        }

        // 2. Delete the old file from S3
        String oldUrl = oldImage.getImageUrl();
        String oldKey = oldUrl.substring(oldUrl.indexOf("sublease-images/"));
        s3Service.deleteFile(oldKey);

        // 3. Upload the new file to S3
        String newKey = "sublease-images/" + subleaseId + "/" + UUID.randomUUID().toString() + "-" + newFile.getOriginalFilename();
        String newImageUrl = s3Service.uploadFile(newKey, newFile.getBytes());

        // 4. Update the URL in the database
        oldImage.setImageUrl(newImageUrl);
        subleaseImageRepository.save(oldImage);

        return sublease; // Return the parent sublease
    }

    /*
     * PUBLIC USER ACCESS
     * findSubleaseById (finds specific sublease by sublease id)
     * searchSublease (finds sublease within a perimeter)
     */

    @Transactional(readOnly = true)
    public List<SubleaseResponseDTO> getAllSublease() {
        List<Sublease> subleases = subleaseRepository.findAllByOrderByDatePostedDesc();
        return subleases.stream().map(subleaseMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public Optional<Sublease> findSubleaseById(Long id) {
        return subleaseRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<SubleaseResponseDTO> searchSublease(
            Double maxPrice, Double latMin, Double latMax, Double lngMin,Double lngMax, Double widthMin, Double widthMax, Double depthMin, Double depthMax, String leaseName, Set<SubleaseAmenity> requiredAmenities, Set<Schools> schools, Set<SubleaseRoomType> roomType) {
        if (maxPrice == null || maxPrice <= 0) maxPrice = Double.MAX_VALUE;
        if (latMin == null) latMin = -90.0;
        if (latMax == null) latMax = 90.0;
        if (lngMin == null) lngMin = -180.0;
        if (lngMax == null) lngMax = 180.0;
        if (widthMin == null) widthMin = 0.0;
        if (widthMax == null || widthMax < widthMin) widthMax = widthMin;
        if (depthMin == null) depthMin = 0.0;
        if (depthMax == null || depthMax < depthMin) depthMax = depthMin;

        List<Sublease> results = subleaseRepository.searchWithOptionalNameAndLocation(
            maxPrice, latMin, latMax, lngMin, lngMax, widthMin, widthMax, depthMin, depthMax, leaseName
        );

        // Filter by amenities
        if (requiredAmenities != null && !requiredAmenities.isEmpty()) {
            results = results.stream()
                .filter(s -> s.getAmenities().containsAll(requiredAmenities))
                .toList();
        }

        // filter by school
        if (schools != null && !schools.isEmpty()) {
            results = results.stream()
                .filter(s -> s.getLeaseSchool().containsAll(schools))
                .toList();
        }

        // filter by room type
        if (roomType != null && !roomType.isEmpty()) {
            results = results.stream()
                .filter(s -> s.getRoomType().containsAll(roomType))
                .toList();
        }

        // Convert to DTOs
        return results.stream()
            .map(subleaseMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public List<Sublease> getNewestSubleases(int limit) {
        return subleaseRepository.findAllByOrderByDatePostedDesc(PageRequest.of(0, limit)).getContent();
    }

    /*
     * OWNER SUBLEASE ACCESS
     */

    @Transactional(readOnly = true)
    public List<SubleaseResponseDTO> getSubleaseByAccountOrderedByDate(@Nullable Integer limit) {
        Account account = currentAccountProvider.getCurrentUserAccount();

        List<Sublease> subleases;

        if (limit != null && limit > 0) {
            Page<Sublease> page = subleaseRepository.findByAccountOrderByDatePostedDesc(account, PageRequest.of(0, limit));
            subleases = page.getContent();
        } else {
            subleases = subleaseRepository.findByAccountOrderByDatePostedDesc(account);
        }

        return subleases.stream()
            .map(subleaseMapper::toResponse)
            .toList();
    }
}
