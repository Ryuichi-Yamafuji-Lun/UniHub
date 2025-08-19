package com.unihub.api.unihub_backend.account.publicaccess.auth.signup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.UUID;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountRegistrationRequest;
import com.unihub.api.unihub_backend.account.dto.GoogleSignupRequest;
import com.unihub.api.unihub_backend.account.mapper.AccountMapper;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.common.util.EmailDomainUtil;
import com.unihub.api.unihub_backend.service.S3Service;
import com.unihub.api.unihub_backend.verification.EmailService;
import com.unihub.api.unihub_backend.verification.VerificationTokenService;

import java.time.LocalDate;
import java.util.Collections;

@Service
public class PublicAccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final VerificationTokenService verificationTokenService;
    private final EmailService emailService;
    private final S3Service s3Service;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    public PublicAccountService(AccountRepository accountRepository, AccountMapper accountMapper,
            VerificationTokenService verificationTokenService, EmailService emailService, S3Service s3Service) {
        this.accountRepository = accountRepository;
        this.accountMapper = accountMapper;
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;
        this.s3Service = s3Service;
    }

    @Transactional
    public Account registerAccount(AccountRegistrationRequest request, MultipartFile profilePictureFile) throws IOException {
        String domain = EmailDomainUtil.extractDomainFromEmail(request.getEmail());
        if (!Schools.isValidDomain(domain)) {
            throw new IllegalArgumentException("Email domain is not supported");
        }
        
        Account account = accountMapper.fromRegistrationRequest(request);
        account.setAccountStatus(AccountStatus.UNVERIFIED);

        if (profilePictureFile != null && !profilePictureFile.isEmpty()) {
            String key = "profile-pictures/" + UUID.randomUUID().toString() + "-" + profilePictureFile.getOriginalFilename();
            String imageUrl = s3Service.uploadFile(key, profilePictureFile.getBytes());
            account.setProfilePicture(imageUrl);
        }
        
        Account savedAccount = accountRepository.save(account);

        String token = java.util.UUID.randomUUID().toString();
        verificationTokenService.createToken(savedAccount, token, 60);
        String verificationLink = "http://localhost:8080/api/v1/verify?token=" + token;
        String emailBody = buildEmail(savedAccount.getFirstName(), verificationLink);
        emailService.sendEmail(savedAccount.getEmail(), "Confirm your UniHub Account", emailBody);

        return savedAccount;
    }

    @Transactional
    public Account registerGoogleAccount(GoogleSignupRequest request, MultipartFile profilePictureFile) throws IOException {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
            
            GoogleIdToken idToken = verifier.verify(request.getCredential());
            if (idToken == null) {
                throw new IllegalArgumentException("Invalid Google ID token.");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            
            String domain = EmailDomainUtil.extractDomainFromEmail(email);
            if (!Schools.isValidDomain(domain)) {
                throw new IllegalArgumentException("Email domain is not supported");
            }

            if (accountRepository.findByEmail(email).isPresent()) {
                throw new IllegalStateException("An account with this email already exists.");
            }
            if (accountRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new IllegalStateException("This username is already taken.");
            }

            Account newAccount = new Account();
            newAccount.setEmail(email);
            newAccount.setUsername(request.getUsername());
            newAccount.setFirstName((String) payload.get("given_name"));
            newAccount.setLastName((String) payload.get("family_name"));
            newAccount.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
            newAccount.setPassword(null);
            newAccount.setAccountStatus(AccountStatus.ACTIVE);
            newAccount.setSchool(Schools.fromDomain(EmailDomainUtil.extractDomainFromEmail(email)));

            if (profilePictureFile != null && !profilePictureFile.isEmpty()) {
                String key = "profile-pictures/" + UUID.randomUUID().toString() + "-" + profilePictureFile.getOriginalFilename();
                String imageUrl = s3Service.uploadFile(key, profilePictureFile.getBytes());
                newAccount.setProfilePicture(imageUrl);
            }

            return accountRepository.save(newAccount);

        } catch (Exception e) {
            throw new RuntimeException("Google signup failed: " + e.getMessage(), e);
        }
    }

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