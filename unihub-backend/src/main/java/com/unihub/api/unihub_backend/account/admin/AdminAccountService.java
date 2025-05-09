package com.unihub.api.unihub_backend.account.admin;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatusRoleResponse;
import com.unihub.api.unihub_backend.accountstatusrole.Role;

@Service
public class AdminAccountService {

    private final AccountRepository accountRepository;

    public AdminAccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // find account by id
    @Transactional(readOnly = true)
    public Optional<Account> findAccountById(Long id) {
        return accountRepository.findById(id);
    }

    // find account by school email
    @Transactional(readOnly = true)
    public Optional<Account> findAccountBySchoolEmail(String schoolEmail) {
        return accountRepository.findBySchoolEmail(schoolEmail);
    }
    
    // delete account account
    @Transactional
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    // get account role and status
    @Transactional(readOnly = true)
    public AccountStatusRoleResponse getAccountRoleAndStatus(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));
        
        return new AccountStatusRoleResponse(account.getRole(), account.getAccountStatus());
    }

    // update account role
    @Transactional
    public Account updateAccountRole(Long id, Role newRole) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));

        account.setRole(newRole);
        account.setUpdatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }

    // update account status
    @Transactional
    public Account updateAccountStatus(Long id, AccountStatus newaccountStatus) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("account not found"));

        account.setAccountStatus(newaccountStatus);
        account.setUpdatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }  

}
