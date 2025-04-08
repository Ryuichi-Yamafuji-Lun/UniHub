package com.cardinalcart.api.cardinalcart_backend.user;

import com.cardinalcart.api.cardinalcart_backend.role.Role; 
import com.cardinalcart.api.cardinalcart_backend.userstatus.UserStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // User private information 
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    // User school email
    private String schoolEmail;

    // User account track
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Track User activity and permission
    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    // For JPA
    public User(){}

    // Set User
    public User(String firstName, String lastName, LocalDate dateOfBirth, String schoolEmail, LocalDateTime createdAt,
            LocalDateTime updatedAt, Role role, UserStatus userStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.schoolEmail = schoolEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
        this.userStatus = userStatus;
    }

    // Getter & Setter
    public long getId() {
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

    public UserStatus getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
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
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", role=" + role +
                ", userStatus=" + userStatus +
                '}';
    }

}
