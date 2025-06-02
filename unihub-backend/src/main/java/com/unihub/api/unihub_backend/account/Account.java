package com.unihub.api.unihub_backend.account;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@EntityListeners(AuditingEntityListener.class)
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
    private String email;
    
    // User username
    @Column(nullable = false, unique = true)
    private String username;
    // User Password
    @Column(nullable = false)
    private String password;

    // User account track
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // Track User activity and permission
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = Set.of(Role.ROLE_USER);

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    // check for suspension
    private Byte unsafeFlag = 0;
    private Byte suspensionCount = 0;
    
    // For JPA
    public Account(){}

    // Set User
    

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public Account(String firstName, String lastName, LocalDate dateOfBirth, String profilePicture, Float sumOfRatings,
            Integer numberOfRatings, String email, String username, String password, Set<Role> roles, AccountStatus accountStatus, Byte unsafeFlag,
            Byte suspensionCount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.profilePicture = profilePicture;
        this.sumOfRatings = sumOfRatings;
        this.numberOfRatings = numberOfRatings;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.accountStatus = accountStatus;
        this.unsafeFlag = unsafeFlag;
        this.suspensionCount = suspensionCount;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password=" + password + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", numberOfRatings=" + numberOfRatings +
                ", sumOfRatings=" + sumOfRatings +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", role=" + roles +
                ", accountStatus=" + accountStatus +
                ", unsafeFlag=" + unsafeFlag +
                ", suspensionCount=" + suspensionCount +
                '}';
    }

}
