package com.unihub.api.unihub_backend.security.utils;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

@Component
public class CurrentAccountProvider {

    private final AccountRepository accountRepository;

    public CurrentAccountProvider(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getCurrentUserAccount() {
        String identifier = SecurityContextHolder.getContext().getAuthentication().getName();

        Account account = accountRepository.findByEmail(identifier)
            .or(() -> accountRepository.findByUsername(identifier))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authenticated account not found"));
        
        if (account.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Account is not active. Please confirm your email.");
        }

        return account;
    }
}