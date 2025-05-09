package com.unihub.api.unihub_backend.account;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // User private information 
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String profilePicture;

    private Float sumOfRatings = 5.0f;
    private Integer numberOfRatings = 1;
    
    // User school email
    @Column(unique = true, nullable = false)
    private String schoolEmail;

    // User account track
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Track User activity and permission
    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    // check for suspension
    private Byte unsafeFlag = 0;
    private Byte suspensionCount = 0;
    
    // For JPA
    public Account(){}

    // Set User
    public Account(String firstName, String lastName, LocalDate dateOfBirth, String profilePicture, Float sumOfRatings,
    Integer numberOfRatings, String schoolEmail, LocalDateTime createdAt, LocalDateTime updatedAt, Role role,
    AccountStatus accountStatus, Byte unsafeFlag, Byte suspensionCount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.profilePicture = profilePicture;
        this.sumOfRatings = sumOfRatings;
        this.numberOfRatings = numberOfRatings;
        this.schoolEmail = schoolEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
        this.accountStatus = accountStatus;
        this.unsafeFlag = unsafeFlag;
        this.suspensionCount = suspensionCount;
    }

    // Getter & Setter
    public Long getId() {
        return id;
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

    public String getSchoolEmail() {
        return schoolEmail;
    }

    public void setSchoolEmail(String schoolEmail) {
        this.schoolEmail = schoolEmail;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Byte getUnsafeFlag() {
        return unsafeFlag;
    }

    public void setUnsafeFlag(Byte unsafeFlag) {
        this.unsafeFlag = unsafeFlag;
    }

    public Byte getSuspensionCount() {
        return suspensionCount;
    }

    public void setSuspensionCount(Byte suspensionCount) {
        this.suspensionCount = suspensionCount;
    }

    // Return user information in string format
    @Override
    public String toString() {
        return "User {" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", schoolEmail='" + schoolEmail + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", numberOfRatings=" + numberOfRatings +
                ", sumOfRatings=" + sumOfRatings +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", role=" + role +
                ", accountStatus=" + accountStatus +
                ", unsafeFlag=" + unsafeFlag +
                ", suspensionCount=" + suspensionCount +
                '}';
    }

}
