package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.common.util.EmailDomainUtil;
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

    @Transactional
    public Account registerAccount(AccountRegistrationRequest request) {
        String domain = EmailDomainUtil.extractDomainFromEmail(request.getEmail());
        if (!Schools.isValidDomain(domain)) {
            throw new IllegalArgumentException("Email domain is not supported");
        }

        Account account = accountMapper.fromRegistrationRequest(request);
        Account savedAccount = accountRepository.save(account);

        String token = java.util.UUID.randomUUID().toString();
        verificationTokenService.createToken(savedAccount, token, 60); // 60 minutes expiry

        String verificationLink = "http://localhost:8080/api/v1/verify?token=" + token;

        String emailBody = buildEmail(savedAccount.getFirstName(), verificationLink);
        
        emailService.sendEmail(
            savedAccount.getEmail(), 
            "Confirm your UniHub Account", 
            emailBody
        );

        return savedAccount;
    }

    /**
     * Helper method to build the HTML content for the verification email.
     */
    private String buildEmail(String name, String link) {
        return "<!DOCTYPE html><html><head><style>" +
            "body {font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;}" +
            ".container {max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);}" +
            ".header {font-size: 24px; font-weight: bold; color: #4A90E2; margin-bottom: 20px; text-align: center;}" +
            ".content {font-size: 16px; line-height: 1.6;}" +
            ".button {display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #4A90E2; border-radius: 5px; text-decoration: none;}" +
            ".footer {font-size: 12px; color: #888; text-align: center; margin-top: 20px;}" +
            "</style></head><body>" +
            "<div class='container'>" +
            "<div class='header'>Welcome to UniHub!</div>" +
            "<div class='content'>" +
            "<p>Hello " + name + ",</p>" +
            "<p>Thank you for registering. Please click the button below to activate your account:</p>" +
            "<a href='" + link + "' class='button'>Verify Email Address</a>" +
            "<p>If you did not create an account, you can safely ignore this email.</p>" +
            "</div>" +
            "<div class='footer'><p>&copy; 2025 UniHub. All rights reserved.</p></div>" +
            "</div>" +
            "</body></html>";
    }
}