package com.unihub.api.unihub_backend.account.mapper;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.dto.AccountResponseDTO;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.Role;

@Component
public class AccountMapper {
    
    private final PasswordEncoder passwordEncoder;
    
    public AccountMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

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

    public Account fromRegistrationRequest(AccountRegistrationRequest request) {
        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setUsername(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword())); 
        account.setFirstName(request.getFirstName());
        account.setLastName(request.getLastName());
        account.setDateOfBirth(request.getDateOfBirth());
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        // Set defaults
        account.setRoles(Set.of(Role.ROLE_USER));
        account.setAccountStatus(AccountStatus.UNVERIFIED);
        account.setSumOfRatings(5.0f);
        account.setNumberOfRatings(1);
        account.setUnsafeFlag((byte) 0);
        account.setSuspensionCount((byte) 0);

        return account;
    }
}
