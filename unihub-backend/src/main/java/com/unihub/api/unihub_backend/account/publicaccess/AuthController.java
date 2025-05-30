package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountLoginRequest;

import jakarta.validation.Valid;


@RestController
@RequestMapping(path = "api/v1/public/auth")
public class AuthController {
    
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AccountLoginRequest request) {
        Account account = accountRepository.findByEmail(request.getIdentifier()).or(() -> accountRepository.findByUsername(request.getIdentifier())).orElse(null);

        if(account == null || !passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful");
    }
    
}
