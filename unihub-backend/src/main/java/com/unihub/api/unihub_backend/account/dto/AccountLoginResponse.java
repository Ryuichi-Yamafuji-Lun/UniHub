package com.unihub.api.unihub_backend.account.dto;

public class AccountLoginResponse {
    
    private String token;

    public AccountLoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}
