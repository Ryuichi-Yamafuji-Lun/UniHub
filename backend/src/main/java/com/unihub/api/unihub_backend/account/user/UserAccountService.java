package com.unihub.api.unihub_backend.account.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountUpdateRequest;
import com.unihub.api.unihub_backend.account.dto.DeleteAccountRequest;
import com.unihub.api.unihub_backend.security.utils.CurrentAccountProvider;

@Service
public class UserAccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CurrentAccountProvider currentAccountProvider;

    public UserAccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, CurrentAccountProvider currentAccountProvider) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.currentAccountProvider = currentAccountProvider;
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

        if (request.getProfilePicture() != null) {
            account.setProfilePicture(request.getProfilePicture());
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
