package com.unihub.api.unihub_backend.dormdrop.sublease.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseImage;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseImageDTO;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseRegistrationRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseResponseDTO;

@Component
public class SubleaseMapper {
    
    public SubleaseResponseDTO toResponse(Sublease sublease) {
        SubleaseResponseDTO dto = new SubleaseResponseDTO();
        dto.setId(sublease.getId());
        dto.setDatePosted(sublease.getDatePosted());
        dto.setLeaseName(sublease.getLeaseName());
        dto.setLeasePrice(sublease.getLeasePrice());
        dto.setLeaseStartDate(sublease.getLeaseStartDate());
        dto.setLeaseEndDate(sublease.getLeaseEndDate());
        dto.setNumRoom(sublease.getNumRoom());
        dto.setNumBath(sublease.getNumBath());
        dto.setLeaseDescription(sublease.getLeaseDescription());
        dto.setLeaseAddress(sublease.getLeaseAddress());
        dto.setLongitude(sublease.getLongitude());
        dto.setLatitude(sublease.getLatitude());
        dto.setRoomWidth(sublease.getRoomWidth());
        dto.setRoomDepth(sublease.getRoomDepth());
        dto.setAmenities(sublease.getAmenities());
        dto.setSchool(sublease.getLeaseSchool());
        dto.setRoomType(sublease.getRoomType());

        // Owner
        Account owner = sublease.getAccount();
        if (owner != null) {
            dto.setOwnerId(owner.getId());
            dto.setOwnerUsername(owner.getUsername());
            dto.setOwnerProfilePicture(owner.getProfilePicture());
            dto.setSumOfRatings(owner.getSumOfRatings());
            dto.setNumberOfRatings(owner.getNumberOfRatings()); 
        }

        if (sublease.getLeaseImages() != null) {
            List<SubleaseImageDTO> imageDTOs = sublease.getLeaseImages().stream()
                .sorted(Comparator.comparingInt(SubleaseImage::getImagePosition))
                .map(image -> new SubleaseImageDTO(
                    image.getId(),
                    image.getImageUrl(),
                    image.getImagePosition()
                ))
                .collect(Collectors.toList());
                    
            dto.setLeaseImages(imageDTOs);
        }

        return dto;
    }

    public Sublease fromRegistrationRequest(SubleaseRegistrationRequest request) {
        Sublease sublease = new Sublease();
        sublease.setLeaseName(request.getLeaseName());
        sublease.setLeaseStartDate(request.getLeaseStartDate());
        sublease.setLeaseEndDate(request.getLeaseEndDate());
        sublease.setLeaseSchool(request.getLeaseSchool());
        sublease.setAmenities(request.getAmenities());
        sublease.setRoomType(request.getRoomType());
        sublease.setLeasePrice(request.getLeasePrice());
        sublease.setNumRoom(request.getNumRoom());
        sublease.setNumBath(request.getNumBath());
        sublease.setRoomWidth(request.getRoomWidth());
        sublease.setRoomDepth(request.getRoomDepth());
        sublease.setLeaseDescription(request.getLeaseDescription());
        sublease.setLeaseAddress(request.getLeaseAddress());
        sublease.setLatitude(request.getLatitude());
        sublease.setLongitude(request.getLongitude());

        return sublease;
    }
}