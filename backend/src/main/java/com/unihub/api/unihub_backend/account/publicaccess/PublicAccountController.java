package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.dto.AccountResponseDTO;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/v2/public/account")
public class PublicAccountController {

    private final PublicAccountService accountService;
    private final AccountMapper accountMapper;

    public PublicAccountController(PublicAccountService accountService, AccountMapper accountMapper) {
        this.accountService = accountService;
        this.accountMapper = accountMapper;
    }

    @PostMapping
    public ResponseEntity<AccountResponseDTO> createAccount(@Valid @RequestBody AccountRegistrationRequest request) {
        System.out.println("CreateAccount endpoint hit with email: " + request.getEmail());
        Account createdAccount = accountService.registerAccount(request);
        return ResponseEntity.status(201).body(accountMapper.toResponse(createdAccount, false));
    }
}
