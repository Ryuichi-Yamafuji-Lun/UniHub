package com.unihub.api.unihub_backend.verification;

import java.util.Optional;

import com.unihub.api.unihub_backend.account.Account;

public class VerificationTokenService {
    
    private final VerificationTokenRepository verificationTokenRepository;

    public VerificationTokenService(VerificationTokenRepository verificationTokenRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
    }

    public VerificationToken createToken(Account account, String token, int expiryMinutes) {
        VerificationToken verificationToken = new VerificationToken(token, account, expiryMinutes);
        return verificationTokenRepository.save(verificationToken);
    }

    public Optional<VerificationToken> getByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    public void deleteToken(VerificationToken token) {
        verificationTokenRepository.delete(token);
    }
}
