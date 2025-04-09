package com.cardinalcart.api.cardinalcart_backend.account;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.Role;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatusRoleResponse;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // create account account
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    // delete account account
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    // find account by id
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

    // find account by school email
    public Optional<Account> findAccountBySchoolEmail(String schoolEmail) {
        return accountRepository.findBySchoolEmail(schoolEmail);
    }

    /*
     * ADMIN ONLY
     * getAccountRoleAndStatus (gets account role and status)
     * updateAccountRole (change account role if necessary)
     * updateAccountStatus (Change account status such as for suspending)
     */

    // get account role and status
    public AccountStatusRoleResponse getAccountRoleAndStatus(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));
        
        return new AccountStatusRoleResponse(account.getRole(), account.getAccountStatus());
    }

    // update account role
    public Account updateAccountRole(Long id, Role newRole) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));

        account.setRole(newRole);
        account.setUpdatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }

    // update account status
    public Account updateAccountStatus(Long id, AccountStatus newaccountStatus) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));

        account.setAccountStatus(newaccountStatus);
        account.setUpdatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }

}
