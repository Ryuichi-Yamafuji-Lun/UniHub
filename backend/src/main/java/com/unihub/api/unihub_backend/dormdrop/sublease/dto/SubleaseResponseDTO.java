package com.unihub.api.unihub_backend.dormdrop.sublease.dto;

import java.time.LocalDate;
import java.util.Set;

import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

public class SubleaseResponseDTO {
    private Long id;
    private LocalDate datePosted;
    private String leaseName;
    private Double leasePrice;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;
    private String leaseImage;
    private Byte numRoom;
    private Byte numBath;
    private Double roomWidth;
    private Double roomDepth;
    private String leaseDescription;
    private String leaseAddress;
    private Double longitude;
    private Double latitude;
    private Set<SubleaseAmenity> amenities;
    private Schools school;

    // Minimal Owner Info
    private Long ownerId;
    private String ownerUsername;
    private String ownerProfilePicture;
    private Float sumOfRatings;
    private Integer numberOfRatings;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDatePosted() {
        return datePosted;
    }
    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }
    public String getLeaseName() {
        return leaseName;
    }
    public void setLeaseName(String leaseName) {
        this.leaseName = leaseName;
    }
    public Double getLeasePrice() {
        return leasePrice;
    }
    public void setLeasePrice(Double leasePrice) {
        this.leasePrice = leasePrice;
    }
    public LocalDate getLeaseStartDate() {
        return leaseStartDate;
    }
    public void setLeaseStartDate(LocalDate leaseStartDate) {
        this.leaseStartDate = leaseStartDate;
    }
    public LocalDate getLeaseEndDate() {
        return leaseEndDate;
    }
    public void setLeaseEndDate(LocalDate leaseEndDate) {
        this.leaseEndDate = leaseEndDate;
    }
    public String getLeaseImage() {
        return leaseImage;
    }
    public void setLeaseImage(String leaseImage) {
        this.leaseImage = leaseImage;
    }
    public Byte getNumRoom() {
        return numRoom;
    }
    public void setNumRoom(Byte numRoom) {
        this.numRoom = numRoom;
    }
    public Byte getNumBath() {
        return numBath;
    }
    public void setNumBath(Byte numBath) {
        this.numBath = numBath;
    }
    public Double getRoomWidth() {
        return roomWidth;
    }
    public void setRoomWidth(Double roomWidth) {
        this.roomWidth = roomWidth;
    }
    public Double getRoomDepth() {
        return roomDepth;
    }
    public void setRoomDepth(Double roomDepth) {
        this.roomDepth = roomDepth;
    }
    public String getLeaseDescription() {
        return leaseDescription;
    }
    public void setLeaseDescription(String leaseDescription) {
        this.leaseDescription = leaseDescription;
    }
    public String getLeaseAddress() {
        return leaseAddress;
    }
    public void setLeaseAddress(String leaseAddress) {
        this.leaseAddress = leaseAddress;
    }
    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    public Set<SubleaseAmenity> getAmenities() {
        return amenities;
    }
    public void setAmenities(Set<SubleaseAmenity> amenities) {
        this.amenities = amenities;
    }
    public Schools getSchool() {
        return school;
    }
    public void setSchool(Schools school) {
        this.school = school;
    }
        public Long getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
    public String getOwnerUsername() {
        return ownerUsername;
    }
    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }
    public String getOwnerProfilePicture() {
        return ownerProfilePicture;
    }
    public void setOwnerProfilePicture(String ownerProfilePicture) {
        this.ownerProfilePicture = ownerProfilePicture;
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
}
