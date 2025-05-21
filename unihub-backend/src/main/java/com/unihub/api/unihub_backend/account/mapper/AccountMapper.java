package com.unihub.api.unihub_backend.account.mapper;

import org.springframework.stereotype.Component;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.dto.AccountResponseDTO;

@Component
public class AccountMapper {
    
    public AccountResponseDTO toResponse(Account account, boolean includeAdminFields) {
        AccountResponseDTO dto = new AccountResponseDTO();

        dto.setId(account.getId());
        dto.setEmail(account.getEmail());
        dto.setUsername(account.getUsername());
        dto.setFirstName(account.getFirstName());
        dto.setLastName(account.getLastName());
        dto.setDateOfBirth(account.getDateOfBirth());
        dto.setProfilePicture(account.getProfilePicture());
        dto.setSumOfRatings(account.getSumOfRatings());
        dto.setNumberOfRatings(account.getNumberOfRatings());
        dto.setCreatedAt(account.getCreatedAt());
        dto.setUpdatedAt(account.getUpdatedAt());

        if (includeAdminFields) {
            dto.setRoles(account.getRoles());
            dto.setAccountStatus(account.getAccountStatus());
        }

        return dto;
    }
}
