package com.unihub.api.unihub_backend.account.dto;

public class AccountLoginRequest {
    private String identifier;
    private String Password;
    public String getIdentifier() {
        return identifier;
    }
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
    public String getPassword() {
        return Password;
    }
    public void setPassword(String password) {
        Password = password;
    }

    
    
}
