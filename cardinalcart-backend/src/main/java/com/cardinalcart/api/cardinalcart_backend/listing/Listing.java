package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;

import com.cardinalcart.api.cardinalcart_backend.account.Account;

import jakarta.persistence.Entity;
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

    private String listingName; 
    private Double listingPrice;   
    private String listingDescription;  
    private String listingImages; 
    private LocalDateTime datePosted;
    private Boolean isSold;

    public Listing(){}

    public Listing(Account account, String listingName, Double listingPrice, String listingDescription, String listingImages, LocalDateTime datePosted, Boolean isSold) {
        this.account = account;
        this.listingName = listingName;
        this.listingPrice = listingPrice;
        this.listingDescription = listingDescription;
        this.listingImages = listingImages;
        this.datePosted = datePosted;
        this.isSold = isSold;
    }

    public Long getId() {
        return id;
    }

    public Account getAccount() {
        return account;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getListingName() {
        return listingName;
    }

    public void setListingName(String listingName) {
        this.listingName = listingName;
    }

    public Double getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(Double listingPrice) {
        this.listingPrice = listingPrice;
    }

    public String getListingDescription() {
        return listingDescription;
    }

    public void setListingDescription(String listingDescription) {
        this.listingDescription = listingDescription;
    }

    public String getListingImages() {
        return listingImages;
    }

    public void setListingImages(String listingImages) {
        this.listingImages = listingImages;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public Boolean getIsSold() {
        return isSold;
    }

    public void setIsSold(Boolean isSold) {
        this.isSold = isSold;
    }

    // Return listing information in string format
    @Override
    public String toString() {
        return "Listing {" +
                "id=" + id +
                ", listingName='" + listingName + '\'' +
                ", account='" + account + '\'' +
                ", version=" + version +
                ", listingDescription='" + listingDescription + '\'' +
                ", listingPrice=" + listingPrice +
                ", listingImage" + listingImages +
                ", isSold" + isSold +
                ", datePosted=" + datePosted +
                '}';
    }
}
