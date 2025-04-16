package com.cardinalcart.api.cardinalcart_backend.account.publicaccess;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;

@Service
public class PublicAccountService {

    private final AccountRepository accountRepository;

    public PublicAccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // create account account
    @Transactional
    public Account createAccount(Account account) {
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        return accountRepository.save(account);
    }
}
