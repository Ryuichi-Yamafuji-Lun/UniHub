package com.unihub.api.unihub_backend.account.dto;

public class AccountLoginRequest {
    private String identifier;
    private String password;

    public String getIdentifier() {
        return identifier;
    }
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
