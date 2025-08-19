package com.unihub.api.unihub_backend.account.dto;

import jakarta.validation.constraints.Size;

public class AccountUpdateRequest {
    private String firstName;
    private String lastName;

    @Size(min = 3, max = 20, message = "Username must be between 3-20 characters")
    private String username;

    private String password;

    private String currentPassword;

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getCurrentPassword() {
        return currentPassword;
    }
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
}
