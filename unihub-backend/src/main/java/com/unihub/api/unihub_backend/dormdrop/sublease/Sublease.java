package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Version;

@Entity
public class Sublease {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Account account;

    @Version
    private Long version;

    private LocalDateTime datePosted;
    private LocalDateTime leaseStartDate;
    private LocalDateTime leaseEndDate;
    private String leaseName;

    @Enumerated(EnumType.STRING)
    private Schools leaseSchool;
    @ElementCollection(targetClass = SubleaseAmenity.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "sublease_amenities", joinColumns = @JoinColumn(name = "sublease_id"))
    private Set<SubleaseAmenity> amenities;

    private Double leasePrice;
    private String roomType;
    private String leaseImage;
    private String leaseDescription;
    private String leaseAddress;
    private Double longitude;
    private Double latitude;

    public Sublease(){}

    public Sublease(Account account, Long version, LocalDateTime datePosted, LocalDateTime leaseStartDate,
            LocalDateTime leaseEndDate, String leaseName, Schools leaseSchool, Set<SubleaseAmenity> amenities,
            Double leasePrice, String roomType, String leaseImage, String leaseDescription, String leaseAddress,
            Double longitude, Double latitude) {
        this.account = account;
        this.version = version;
        this.datePosted = datePosted;
        this.leaseStartDate = leaseStartDate;
        this.leaseEndDate = leaseEndDate;
        this.leaseName = leaseName;
        this.leaseSchool = leaseSchool;
        this.amenities = amenities;
        this.leasePrice = leasePrice;
        this.roomType = roomType;
        this.leaseImage = leaseImage;
        this.leaseDescription = leaseDescription;
        this.leaseAddress = leaseAddress;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Long getId() {
        return id;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public LocalDateTime getLeaseStartDate() {
        return leaseStartDate;
    }

    public void setLeaseStartDate(LocalDateTime leaseStartDate) {
        this.leaseStartDate = leaseStartDate;
    }

    public LocalDateTime getLeaseEndDate() {
        return leaseEndDate;
    }

    public void setLeaseEndDate(LocalDateTime leaseEndDate) {
        this.leaseEndDate = leaseEndDate;
    }

    public String getLeaseName() {
        return leaseName;
    }

    public void setLeaseName(String leaseName) {
        this.leaseName = leaseName;
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

    // Return sublease information in string format
    @Override
    public String toString() {
        return "SubLease {" +
               "id=" + id +
               ", datePosted=" + datePosted +
               ", leaseName='" + leaseName + '\'' +
               ", School='" + leaseSchool + '\'' +
               ", account='" + account.getFirstName() + '\'' +
               ", version=" + version +
               ", leasePrice=" + leasePrice +
               ", RoomType=" + roomType +
               ", leaseImage" + leaseImage +
               ", startDate=" + leaseStartDate +
               ", endDate=" + leaseEndDate +
               ", Address=" + leaseAddress +
               ", Longitude=" + longitude +
               ", Latitude=" + latitude +
               ", leaseDescription='" + leaseDescription + '\'' + 
               '}';
    }
}
