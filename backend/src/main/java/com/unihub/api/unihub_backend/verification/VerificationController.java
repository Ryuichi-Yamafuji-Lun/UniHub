package com.unihub.api.unihub_backend.verification;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/verify")
public class VerificationController {
    
    private final VerificationTokenService verificationTokenService;
    private final AccountRepository accountRepository;

    // need to insert create frontend page for verification comfirmation
    @Value("${verification.redirect.success-url}")
    private String successUrl;

    @Value("${verification.redirect.failure-url}")
    private String failureUrl;

    public VerificationController(VerificationTokenService verificationTokenService,
            AccountRepository accountRepository) {
        this.verificationTokenService = verificationTokenService;
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public ResponseEntity<Void> confirmEmail(@RequestParam("token") String token) {
        Optional<VerificationToken> verificationTokenOpt = verificationTokenService.getByToken(token);

        if (verificationTokenOpt.isEmpty() || verificationTokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return redirect(failureUrl + "?error=invalid_token");
        }

        VerificationToken verificationToken = verificationTokenOpt.get();
        Account account = verificationToken.getAccount();
        account.setAccountStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
        verificationTokenService.deleteToken(verificationToken);

        return redirect(successUrl);
    }

    private ResponseEntity<Void> redirect(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(url));
        // Return an HTTP 302 Found response to trigger the browser redirect
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}