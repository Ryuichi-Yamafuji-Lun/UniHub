package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.time.LocalDate;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseRoomType;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
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

    private LocalDate datePosted;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;
    private String leaseName;

    @ElementCollection(targetClass = Schools.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "sublease_target_schools", joinColumns = @JoinColumn(name = "sublease_id"))
    @Column(name = "school")
    private Set<Schools> leaseSchool;

    @ElementCollection(targetClass = SubleaseAmenity.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "sublease_amenities", joinColumns = @JoinColumn(name = "sublease_id"))
    private Set<SubleaseAmenity> amenities;
    
    @ElementCollection(targetClass = SubleaseRoomType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "sublease_room_type", joinColumns = 
    @JoinColumn(name = "room_type"))
    private Set<SubleaseRoomType> roomType;

    private Double leasePrice;
    private Byte numRoom;
    private Byte numBath;
    private Double roomDepth;
    private Double roomWidth;
    private String leaseImage;
    private String leaseDescription;
    private String leaseAddress;
    private Double longitude;
    private Double latitude;

    public Sublease(){}

    public Sublease(Account account, Long version, LocalDate datePosted, LocalDate leaseStartDate,
            LocalDate leaseEndDate, String leaseName, Set<Schools> leaseSchool, Set<SubleaseAmenity> amenities, Set<SubleaseRoomType> roomType,
            Double leasePrice, Byte numRoom, Byte numBath, Double roomDepth, Double roomWidth,String leaseImage, String leaseDescription, String leaseAddress,
            Double longitude, Double latitude) {
        this.account = account;
        this.version = version;
        this.datePosted = datePosted;
        this.leaseStartDate = leaseStartDate;
        this.leaseEndDate = leaseEndDate;
        this.leaseName = leaseName;
        this.leaseSchool = leaseSchool;
        this.amenities = amenities;
        this.roomType = roomType;
        this.leasePrice = leasePrice;
        this.numRoom = numRoom;
        this.numBath = numBath;
        this.roomDepth = roomDepth;
        this.roomWidth = roomWidth;
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

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
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

    public String getLeaseName() {
        return leaseName;
    }

    public void setLeaseName(String leaseName) {
        this.leaseName = leaseName;
    }

    public Set<Schools> getLeaseSchool() {
        return leaseSchool;
    }

    public void setLeaseSchool(Set<Schools> leaseSchool) {
        this.leaseSchool = leaseSchool;
    }

    public Set<SubleaseAmenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(Set<SubleaseAmenity> amenities) {
        this.amenities = amenities;
    }
    
    public Set<SubleaseRoomType> getRoomType() {
        return roomType;
    }

    public void setRoomType(Set<SubleaseRoomType> roomType) {
        this.roomType = roomType;
    }

    public Double getLeasePrice() {
        return leasePrice;
    }

    public void setLeasePrice(Double leasePrice) {
        this.leasePrice = leasePrice;
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

    public Double getRoomDepth() {
        return roomDepth;
    }

    public void setRoomDepth(Double roomDepth) {
        this.roomDepth = roomDepth;
    }

    public Double getRoomWidth() {
        return roomWidth;
    }

    public void setRoomWidth(Double roomWidth) {
        this.roomWidth = roomWidth;
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
               ", numRoom=" + numRoom + 
               ", numBath=" + numBath + 
               ", Width=" + roomDepth +
               ", Depth=" + roomWidth +
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
