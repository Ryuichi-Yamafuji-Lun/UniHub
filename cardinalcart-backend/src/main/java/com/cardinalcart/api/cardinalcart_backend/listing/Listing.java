package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingCategory;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingSchools;
//import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingStatus;

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
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; 

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Version
    private Long version;

    private LocalDateTime datePosted;
    private LocalDateTime boostedDate;
    private Boolean isSold;
    private String listingName; 

    @Enumerated(EnumType.STRING)
    private ListingSchools listingSchool;
    @Enumerated(EnumType.STRING)
    private ListingCategory listingCategory;

    private Double listingPrice;
    private String listingImages;    
    private String listingDescription;  
    
    public Listing(){}

    public Listing(Account account, Long version, LocalDateTime datePosted, LocalDateTime boostedDate, Boolean isSold, String listingName,
            ListingSchools listingSchool, ListingCategory listingCategory, Double listingPrice, String listingImages,
            String listingDescription) {
        this.account = account;
        this.version = version;
        this.datePosted = datePosted;
        this.boostedDate = boostedDate;
        this.isSold = isSold;
        this.listingName = listingName;
        this.listingSchool = listingSchool;
        this.listingCategory = listingCategory;
        this.listingPrice = listingPrice;
        this.listingImages = listingImages;
        this.listingDescription = listingDescription;
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

    public LocalDateTime getBoostedDate() {
        return boostedDate;
    }

    public void setBoostedDate(LocalDateTime boostedDate) {
        this.boostedDate = boostedDate;
    }

    public Boolean getIsSold() {
        return isSold;
    }

    public void setIsSold(Boolean isSold) {
        this.isSold = isSold;
    }

    public String getListingName() {
        return listingName;
    }

    public void setListingName(String listingName) {
        this.listingName = listingName;
    }

    public ListingSchools getListingSchool() {
        return listingSchool;
    }

    public void setListingSchool(ListingSchools listingSchool) {
        this.listingSchool = listingSchool;
    }

    public ListingCategory getListingCategory() {
        return listingCategory;
    }

    public void setListingCategory(ListingCategory listingCategory) {
        this.listingCategory = listingCategory;
    }

    public Double getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(Double listingPrice) {
        this.listingPrice = listingPrice;
    }

    public String getListingImages() {
        return listingImages;
    }

    public void setListingImages(String listingImages) {
        this.listingImages = listingImages;
    }

    public String getListingDescription() {
        return listingDescription;
    }

    public void setListingDescription(String listingDescription) {
        this.listingDescription = listingDescription;
    }

    // Return listing information in string format
    @Override
    public String toString() {
        return "Listing {" +
                "id=" + id +
                ", isSold" + isSold +
                ", datePosted=" + datePosted +
                ", listingName='" + listingName + '\'' +
                ", listingSchool='" + listingSchool + '\'' +
                ", listingCategory='" + listingCategory + '\'' +
                ", account='" + account.getFirstName() + '\'' +
                ", version=" + version +
                ", listingPrice=" + listingPrice +
                ", listingImage" + listingImages +
                ", listingDescription='" + listingDescription + '\'' + 
                '}';
    }
}
