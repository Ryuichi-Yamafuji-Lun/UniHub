package com.cardinalcart.api.cardinalcart_backend.account;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.Role;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatusRoleResponse;

@RestController
@RequestMapping(path = "api/v1/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account createdAccount = accountService.createAccount(account);
        return ResponseEntity.status(201).body(createdAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {  
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Optional<Account> account = accountService.findAccountById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{schoolEmail}")
    public ResponseEntity<Account> getAccountBySchoolEmail(@PathVariable String schoolEmail) {
        Optional<Account> account = accountService.findAccountBySchoolEmail(schoolEmail);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/role-status")
    public ResponseEntity<AccountStatusRoleResponse> getAccountRoleAndStatus(@PathVariable Long id) {
        AccountStatusRoleResponse accountStatusRoleResponse = accountService.getAccountRoleAndStatus(id);

        return ResponseEntity.ok(accountStatusRoleResponse);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<Account> updateAccountRole(@PathVariable Long id, @RequestParam Role role) {
        Account account = accountService.updateAccountRole(id, role);
        return ResponseEntity.ok(account);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Account> changeAccountStatus(@PathVariable Long id, @RequestParam AccountStatus accountStatus) {
        Account account = accountService.updateAccountStatus(id, accountStatus);
        return ResponseEntity.ok(account);
    }

}
