package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.account.Account;

@RestController
@RequestMapping(path = "api/v2/public/account")
public class PublicAccountController {

    private final PublicAccountService accountService;

    public PublicAccountController(PublicAccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account createdAccount = accountService.createAccount(account);
        return ResponseEntity.status(201).body(createdAccount);
    }
}
