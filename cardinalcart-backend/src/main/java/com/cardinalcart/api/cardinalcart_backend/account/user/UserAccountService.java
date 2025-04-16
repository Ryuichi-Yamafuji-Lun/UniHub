package com.cardinalcart.api.cardinalcart_backend.account.user;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;

@Service
public class UserAccountService {

    private final AccountRepository accountRepository;

    public UserAccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // delete account account (Soft delete in the future)
    @Transactional
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    // find account by id
    @Transactional(readOnly = true)
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

}
