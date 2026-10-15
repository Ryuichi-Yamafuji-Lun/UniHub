package com.unihub.api.unihub_backend.cardinalcart.listing.dto;

import java.time.LocalDateTime;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.cardinalcart.listing.Listing;
import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;

// Exposes the seller only through public profile fields, never the Account entity.
public class ListingResponseDTO {

    private Long id;
    private String listingName;
    private Double listingPrice;
    private Schools listingSchool;
    private ListingCategory listingCategory;
    private String listingImages;
    private String listingDescription;
    private Boolean isSold;
    private LocalDateTime datePosted;

    private Long ownerId;
    private String ownerUsername;
    private String ownerProfilePicture;
    private Float sumOfRatings;
    private Integer numberOfRatings;

    public static ListingResponseDTO from(Listing listing) {
        ListingResponseDTO dto = new ListingResponseDTO();
        dto.id = listing.getId();
        dto.listingName = listing.getListingName();
        dto.listingPrice = listing.getListingPrice();
        dto.listingSchool = listing.getListingSchool();
        dto.listingCategory = listing.getListingCategory();
        dto.listingImages = listing.getListingImages();
        dto.listingDescription = listing.getListingDescription();
        dto.isSold = listing.getIsSold();
        dto.datePosted = listing.getDatePosted();

        Account owner = listing.getAccount();
        if (owner != null) {
            dto.ownerId = owner.getId();
            dto.ownerUsername = owner.getUsername();
            dto.ownerProfilePicture = owner.getProfilePicture();
            dto.sumOfRatings = owner.getSumOfRatings();
            dto.numberOfRatings = owner.getNumberOfRatings();
        }
        return dto;
    }

    public Long getId() { return id; }
    public String getListingName() { return listingName; }
    public Double getListingPrice() { return listingPrice; }
    public Schools getListingSchool() { return listingSchool; }
    public ListingCategory getListingCategory() { return listingCategory; }
    public String getListingImages() { return listingImages; }
    public String getListingDescription() { return listingDescription; }
    public Boolean getIsSold() { return isSold; }
    public LocalDateTime getDatePosted() { return datePosted; }
    public Long getOwnerId() { return ownerId; }
    public String getOwnerUsername() { return ownerUsername; }
    public String getOwnerProfilePicture() { return ownerProfilePicture; }
    public Float getSumOfRatings() { return sumOfRatings; }
    public Integer getNumberOfRatings() { return numberOfRatings; }
}
