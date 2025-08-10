package com.unihub.api.unihub_backend.account.mapper;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.dto.AccountPrivateResponseDTO;
import com.unihub.api.unihub_backend.account.dto.AccountPublicResponseDTO;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.common.util.EmailDomainUtil;

@Component
public class AccountMapper {
    
    private final PasswordEncoder passwordEncoder;
    
    public AccountMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public AccountPrivateResponseDTO toResponse(Account account, boolean includeAdminFields) {
        AccountPrivateResponseDTO dto = new AccountPrivateResponseDTO();

        dto.setId(account.getId());
        dto.setEmail(account.getEmail());
        dto.setUsername(account.getUsername());
        dto.setSchool(account.getSchool().getDisplayName());
        dto.setFirstName(account.getFirstName());
        dto.setLastName(account.getLastName());
        dto.setDateOfBirth(account.getDateOfBirth());
        dto.setProfilePicture(account.getProfilePicture());
        dto.setSumOfRatings(account.getSumOfRatings());
        dto.setNumberOfRatings(account.getNumberOfRatings());
        dto.setCreatedAt(account.getCreatedAt());
        dto.setUpdatedAt(account.getUpdatedAt());

        dto.setHasPassword(account.getPassword() != null && !account.getPassword().isBlank());
        if (includeAdminFields) {
            dto.setRoles(account.getRoles());
            dto.setAccountStatus(account.getAccountStatus());
        }

        return dto;
    }

    public AccountPublicResponseDTO toPublicResponse(Account account) {
        AccountPublicResponseDTO dto = new AccountPublicResponseDTO();
        dto.setId(account.getId());
        dto.setSchool(account.getSchool().getDisplayName());
        dto.setUsername(account.getUsername());
        dto.setProfilePicture(account.getProfilePicture());
        dto.setNumberOfRatings(account.getNumberOfRatings());
        dto.setSumOfRatings(account.getSumOfRatings());
        dto.setCreatedAt(account.getCreatedAt());

        return dto;
    }

    public Account fromRegistrationRequest(AccountRegistrationRequest request) {
        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setSchool(Schools.fromDomain(EmailDomainUtil.extractDomainFromEmail(request.getEmail())));
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
