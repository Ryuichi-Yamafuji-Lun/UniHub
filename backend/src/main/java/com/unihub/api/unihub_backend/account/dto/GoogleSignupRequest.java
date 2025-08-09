package com.unihub.api.unihub_backend.account.dto;

import lombok.Data;

@Data
public class GoogleSignupRequest {
    private String credential;
    private String username;
    private String dateOfBirth;

    public String getCredential() {
        return credential;
    }

    public String getUsername() {
        return username;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }
}