package com.unihub.api.unihub_backend.dormdrop.sublease.dto;

import java.time.LocalDate;
import java.util.Set;

import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SubleaseRegistrationRequest {

    @NotBlank(message = "Lease name is required")
    @Size(max = 100, message = "Lease name must be less than 100 characters")
    private String leaseName;

    @NotNull(message = "Lease start date is required")
    private LocalDate leaseStartDate;

    @NotNull(message = "Lease end date is required")
    private LocalDate leaseEndDate;

    @NotNull(message = "School is required")
    private Schools leaseSchool;

    @NotNull(message = "Amenities must be provided")
    private Set<SubleaseAmenity> amenities;

    @NotNull(message = "Lease price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Lease price must be greater than 0")
    private Double leasePrice;

    @NotBlank(message = "Room type is required")
    @Size(max = 50, message = "Room type must be under 50 characters")
    private String roomType;

    @NotNull(message = "Room width is required")
    @DecimalMin(value = "1.0", inclusive = true, message = "Room width must be at least 1 ft")
    private Double roomWidth;

    @NotNull(message = "Room depth is required")
    @DecimalMin(value = "1.0", inclusive = true, message = "Room depth must be at least 1 ft")
    private Double roomDepth;

    @NotBlank(message = "Lease image URL is required")
    private String leaseImage;

    @NotBlank(message = "Lease description is required")
    @Size(max = 500, message = "Lease description must be under 500 characters")
    private String leaseDescription;

    @NotBlank(message = "Lease address is required")
    @Size(max = 255, message = "Lease address must be under 255 characters")
    private String leaseAddress;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    public String getLeaseName() {
        return leaseName;
    }

    public void setLeaseName(String leaseName) {
        this.leaseName = leaseName;
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

    public Schools getLeaseSchool() {
        return leaseSchool;
    }

    public void setLeaseSchool(Schools leaseSchool) {
        this.leaseSchool = leaseSchool;
    }

    public Set<SubleaseAmenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(Set<SubleaseAmenity> amenities) {
        this.amenities = amenities;
    }

    public Double getLeasePrice() {
        return leasePrice;
    }

    public void setLeasePrice(Double leasePrice) {
        this.leasePrice = leasePrice;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
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

    public String getLeaseImage() {
        return leaseImage;
    }

    public void setLeaseImage(String leaseImage) {
        this.leaseImage = leaseImage;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }   

}
