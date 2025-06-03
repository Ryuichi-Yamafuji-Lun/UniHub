package com.unihub.api.unihub_backend.account.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountUpdateRequest;

@Service
public class UserAccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private Account getCurrentUserAccount() {
        String identifier = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Authenticated identifier: " + identifier);
        return accountRepository.findByEmail(identifier)
            .or(() -> accountRepository.findByUsername(identifier))
            .orElseThrow(() -> new RuntimeException("Authenticated account not found"));
    }

    @Transactional(readOnly = true)
    public Account getOwnAccount() {
        return getCurrentUserAccount();
    }

   @Transactional
    public Account updateOwnAccount(AccountUpdateRequest request) {
        Account account = getCurrentUserAccount();

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
            account.setPassword(passwordEncoder.encode(request.getPassword())); 
        }

        return accountRepository.save(account);
    }

    @Transactional
    public void deleteOwnAccount() {
        Account account = getCurrentUserAccount();
        accountRepository.delete(account);
    }
}
