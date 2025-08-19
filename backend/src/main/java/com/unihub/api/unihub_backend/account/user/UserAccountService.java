package com.unihub.api.unihub_backend.account.user;

import java.io.IOException;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountUpdateRequest;
import com.unihub.api.unihub_backend.account.dto.DeleteAccountRequest;
import com.unihub.api.unihub_backend.security.utils.CurrentAccountProvider;
import com.unihub.api.unihub_backend.service.S3Service;

@Service
public class UserAccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CurrentAccountProvider currentAccountProvider;
    private final S3Service s3Service;

    public UserAccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, CurrentAccountProvider currentAccountProvider, S3Service s3Service) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.currentAccountProvider = currentAccountProvider;
        this.s3Service = s3Service;
    }


    @Transactional(readOnly = true)
    public Account getOwnAccount() {
        return currentAccountProvider.getCurrentUserAccount();
    }

   @Transactional
    public Account updateOwnAccount(AccountUpdateRequest request) {
        Account account = currentAccountProvider.getCurrentUserAccount();

        if (request.getFirstName() != null) {
            account.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            account.setLastName(request.getLastName());
        }

        if (request.getUsername() != null && !request.getUsername().equals(account.getUsername())) {
            if (accountRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Username already taken");
            }
            account.setUsername(request.getUsername());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            if (account.getPassword() != null && !account.getPassword().isBlank()) {
                if (request.getCurrentPassword() == null || request.getCurrentPassword().isBlank()) {
                    throw new IllegalArgumentException("Current password is required to set a new password.");
                }
                if (!passwordEncoder.matches(request.getCurrentPassword(), account.getPassword())) {
                    throw new IllegalArgumentException("Incorrect current password.");
                }
            }
            if (request.getPassword().length() < 8) {
                throw new IllegalArgumentException("Password must be at least 8 characters");
            }
            account.setPassword(passwordEncoder.encode(request.getPassword())); 
        }

        return accountRepository.save(account);
    }

    @Transactional
    public Account updateOwnProfilePicture(MultipartFile file) throws IOException {
        Account account = currentAccountProvider.getCurrentUserAccount();

        if (account.getProfilePicture() != null && !account.getProfilePicture().isEmpty()) {
            try {
                String oldKey = account.getProfilePicture().substring(account.getProfilePicture().indexOf("profile-pictures/"));
                s3Service.deleteFile(oldKey);
            } catch (Exception e) {
                System.err.println("Failed to delete old profile picture: " + e.getMessage());
            }
        }

        String key = "profile-pictures/" + account.getId() + "/" + UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        String imageUrl = s3Service.uploadFile(key, file.getBytes());

        account.setProfilePicture(imageUrl);
        return accountRepository.save(account);
    }

    @Transactional
    public void deleteOwnAccount(DeleteAccountRequest request) {
        Account account = currentAccountProvider.getCurrentUserAccount();

        if (account.getPassword() != null && !account.getPassword().isBlank()) {
            if (request.getPassword() == null || !passwordEncoder.matches(request.getPassword(), account.getPassword())) {
                throw new IllegalArgumentException("Incorrect password. Account deletion failed.");
            }
        } 
        accountRepository.delete(account);
    }
}
