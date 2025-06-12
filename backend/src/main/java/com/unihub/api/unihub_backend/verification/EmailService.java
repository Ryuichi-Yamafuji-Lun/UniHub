package com.unihub.api.unihub_backend.verification;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}
