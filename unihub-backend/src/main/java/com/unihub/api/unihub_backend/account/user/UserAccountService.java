package com.unihub.api.unihub_backend.account.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountUpdateRequest;

@Service
public class UserAccountService {

    private final AccountRepository accountRepository;

    public UserAccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private Account getCurrentUserAccount() {
        return accountRepository.findByEmail(getCurrentUserEmail()).orElseThrow(() -> new RuntimeException("Authenticated account not found"));
    }

    @Transactional(readOnly = true)
    public Account getOwnAccount() {
        return getCurrentUserAccount();
    }

    @Transactional
    public Account updateOwnAccount(AccountUpdateRequest request){
        Account account = getCurrentUserAccount();

        account.setFirstName(request.getFirstName());
        account.setLastName(request.getLastName());
        account.setProfilePicture(request.getProfilePicture());
        if (request.getUsername() != null && !request.getUsername().equals(account.getUsername())) {
            if (accountRepository.existsByUsername(request.getUsername())) {
                throw new RuntimeException("Username already taken");
            }
            account.setUsername(request.getUsername());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            account.setPassword(request.getPassword()); //encrypt later
        }
        
        return accountRepository.save(account);
    }

    @Transactional
    public void deleteOwnAccount() {
        Account account = getCurrentUserAccount();
        accountRepository.delete(account);
    }
}
