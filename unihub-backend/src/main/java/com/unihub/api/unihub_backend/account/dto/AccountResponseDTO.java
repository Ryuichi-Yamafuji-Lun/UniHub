package com.unihub.api.unihub_backend.account.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.Role;

public class AccountResponseDTO {
    private Long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    private String profilePicture;            
    private Float sumOfRatings;               
    private Integer numberOfRatings;

    private LocalDateTime createdAt;          
    private LocalDateTime updatedAt;

    // ADMIN Only Dynamically Apply Restrictions
    private Set<Role> roles;                  
    private AccountStatus accountStatus;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
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
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    public String getProfilePicture() {
        return profilePicture;
    }
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
    public Float getSumOfRatings() {
        return sumOfRatings;
    }
    public void setSumOfRatings(Float sumOfRatings) {
        this.sumOfRatings = sumOfRatings;
    }
    public Integer getNumberOfRatings() {
        return numberOfRatings;
    }
    public void setNumberOfRatings(Integer numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public AccountStatus getAccountStatus() {
        return accountStatus;
    }
    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }
}
