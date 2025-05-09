package com.unihub.api.unihub_backend.account.user;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;

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

    // update account
    @Transactional
    public Account updateAccount(Long id, Account updatedAccount) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account Not Found"));

        account.setFirstName(updatedAccount.getFirstName());
        account.setLastName(updatedAccount.getLastName());
        account.setProfilePicture(updatedAccount.getProfilePicture());
        account.setUpdatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }

    // find account by id
    @Transactional(readOnly = true)
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

}
