package com.unihub.api.unihub_backend.account.dto;

import java.time.LocalDateTime;

public class AccountPublicResponseDTO {
    private Long id;
    private String school;
    private String username;

    private String profilePicture;            
    private Float sumOfRatings;               
    private Integer numberOfRatings;

    private LocalDateTime createdAt;          

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getSchool() {
        return school;
    }
    public void setSchool(String school) {
        this.school = school;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
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
}