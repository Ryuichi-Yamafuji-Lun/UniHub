package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;
import com.unihub.api.unihub_backend.verification.EmailService;
import com.unihub.api.unihub_backend.verification.VerificationTokenService;

@Service
public class PublicAccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;

    public PublicAccountService(AccountRepository accountRepository, AccountMapper accountMapper,
            VerificationTokenService verificationTokenService, EmailService emailService) {
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;
    }

    // create account 
    @Transactional
    public Account registerAccount(AccountRegistrationRequest request) {
        Account account = accountMapper.fromRegistrationRequest(request);
        Account savedAccount = accountRepository.save(account);

        // Generate token
        String token = java.util.UUID.randomUUID().toString();
        verificationTokenService.createToken(savedAccount, token, 60);

            String link = "http://localhost:8080/api/v1/verify?token=" + token;
            String subject = "Verify your UniHub Email";
            String body = "Click the link to verify your account:\n\n" + link;

            emailService.sendEmail(savedAccount.getEmail(), subject, body);

            return savedAccount;
    }
}
