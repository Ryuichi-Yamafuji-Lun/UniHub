package com.unihub.api.unihub_backend.account.user;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountService;
import com.unihub.api.unihub_backend.account.dto.AccountPrivateResponseDTO;
import com.unihub.api.unihub_backend.account.dto.AccountPublicResponseDTO;
import com.unihub.api.unihub_backend.account.dto.AccountUpdateRequest;
import com.unihub.api.unihub_backend.account.dto.DeleteAccountRequest;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/v2/user/account")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class UserAccountController {

    private final UserAccountService userAccountService;
    private final AccountService accountService;
    private final AccountMapper accountMapper;

    
    public UserAccountController(UserAccountService userAccountService, AccountService accountService,
            AccountMapper accountMapper) {
        this.userAccountService = userAccountService;
        this.accountService = accountService;
        this.accountMapper = accountMapper;
    }

    {/* Personal */}
    @GetMapping("/me")
    public ResponseEntity<AccountPrivateResponseDTO> getOwnAccount() {
        Account account = userAccountService.getOwnAccount();
        return ResponseEntity.ok(accountMapper.toResponse(account, false));
    }
   
    @PutMapping("/me/update")
    public ResponseEntity<AccountPrivateResponseDTO> updateAccount(@Valid @RequestBody AccountUpdateRequest request) {
        try {
            Account updated = userAccountService.updateOwnAccount(request);
            return ResponseEntity.ok(accountMapper.toResponse(updated, false));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/me/profile-picture")
    public ResponseEntity<AccountPrivateResponseDTO> updateOwnProfilePicture(@RequestParam("file") MultipartFile file) {
        try {
            Account updatedAccount = userAccountService.updateOwnProfilePicture(file);
            return ResponseEntity.ok(accountMapper.toResponse(updatedAccount, false));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/me/delete")
    public ResponseEntity<Void> deleteAccount(@RequestBody(required = false) DeleteAccountRequest request) {  
        try {
            userAccountService.deleteOwnAccount(request == null ? new DeleteAccountRequest() : request);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    {/* Public */}
    @GetMapping("/{userId}")
    public ResponseEntity<AccountPublicResponseDTO> getAccountById(@PathVariable Long userId) {
        Account account = accountService.findAccountById(userId)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        
        return ResponseEntity.ok(accountMapper.toPublicResponse(account));
    }
}
