package com.unihub.api.unihub_backend.verification;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path = "api/v1/verify")
public class VerificationController {
    
    private final VerificationTokenService verificationTokenService;
    private final AccountRepository accountRepository;

    public VerificationController(VerificationTokenService verificationTokenService,
            AccountRepository accountRepository) {
        this.verificationTokenService = verificationTokenService;
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public ResponseEntity<String> comfirmEmail(@RequestParam String token) {
        VerificationToken verificationToken = verificationTokenService.getByToken(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid token"));

        if(verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
        }

        Account account = verificationToken.getAccount();
        account.setAccountStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
        verificationTokenService.deleteToken(verificationToken);

        return ResponseEntity.ok("Email confirmed successfully!");
    }  
}
