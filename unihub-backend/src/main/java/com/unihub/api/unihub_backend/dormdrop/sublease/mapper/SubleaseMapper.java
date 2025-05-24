package com.unihub.api.unihub_backend.dormdrop.sublease.mapper;

import org.springframework.stereotype.Component;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
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
        dto.setLeaseImage(sublease.getLeaseImage());
        dto.setRoomType(sublease.getRoomType());
        dto.setLeaseDescription(sublease.getLeaseDescription());
        dto.setLeaseAddress(sublease.getLeaseAddress());
        dto.setLongitude(sublease.getLongitude());
        dto.setLatitude(sublease.getLatitude());
        dto.setAmenities(sublease.getAmenities());
        dto.setSchool(sublease.getLeaseSchool());

        // Owner
        Account owner = sublease.getAccount();
        dto.setOwnerUsername(owner.getUsername());
        dto.setOwnerProfilePicture(owner.getProfilePicture());
        dto.setOwnerEmail(owner.getEmail());
        dto.setSumOfRatings(owner.getSumOfRatings());
        dto.setNumberOfRatings(owner.getNumberOfRatings());

        return dto;
    }
}
