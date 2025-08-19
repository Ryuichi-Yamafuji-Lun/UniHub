package com.unihub.api.unihub_backend.account.publicaccess.auth.signup;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.dto.AccountPrivateResponseDTO;
import com.unihub.api.unihub_backend.account.dto.GoogleSignupRequest;
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

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<AccountPrivateResponseDTO> createAccount(
        @RequestPart("userData") @Valid AccountRegistrationRequest request,
        @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture
    ) throws IOException {
        Account createdAccount = accountService.registerAccount(request, profilePicture);
        return ResponseEntity.status(201).body(accountMapper.toResponse(createdAccount, false));
    }

    @PostMapping(path = "/google", consumes = { "multipart/form-data" })
    public ResponseEntity<AccountPrivateResponseDTO> createGoogleAccount(
        @RequestPart("googleData") @Valid GoogleSignupRequest request,
        @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture
    ) throws IOException {
        Account createdAccount = accountService.registerGoogleAccount(request, profilePicture);
        return ResponseEntity.status(201).body(accountMapper.toResponse(createdAccount, false));
    }
}