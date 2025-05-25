package com.unihub.api.unihub_backend.dormdrop.sublease.dto;

import java.time.LocalDate;
import java.util.Set;

import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

public class SubleaseUpdateRequest {

    @Size(max = 100, message = "Lease name must be less than 100 characters")
    private String leaseName;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;
    private Schools leaseSchool;
    private Set<SubleaseAmenity> amenities;

    @DecimalMin(value = "0.0", inclusive = false, message = "Lease price must be greater than 0")
    private Double leasePrice;

    @Size(max = 50, message = "Room type must be under 50 characters")
    private String roomType;

    @DecimalMin(value = "1.0", inclusive = true, message = "Room width must be at least 1 ft")
    private Double roomWidth;

    @DecimalMin(value = "1.0", inclusive = true, message = "Room depth must be at least 1 ft")
    private Double roomDepth;

    private String leaseImage;

    @Size(max = 500, message = "Lease description must be under 500 characters")
    private String leaseDescription;

    @Size(max = 255, message = "Lease address must be under 255 characters")
    private String leaseAddress;

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
    
}
