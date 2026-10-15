package com.unihub.api.unihub_backend.cardinalcart.listing.dto;

import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// Only the fields an owner may set. Account, sold status, and dates are server-controlled.
public class ListingRequest {

    @NotBlank(message = "Listing name is required")
    @Size(max = 100, message = "Listing name must be less than 100 characters")
    private String listingName;

    @NotNull(message = "Listing price is required")
    @DecimalMin(value = "0.0", message = "Listing price cannot be negative")
    private Double listingPrice;

    @NotNull(message = "School is required")
    private Schools listingSchool;

    @NotNull(message = "Category is required")
    private ListingCategory listingCategory;

    private String listingImages;

    @Size(max = 1000, message = "Listing description must be under 1000 characters")
    private String listingDescription;

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

    public Schools getListingSchool() {
        return listingSchool;
    }

    public void setListingSchool(Schools listingSchool) {
        this.listingSchool = listingSchool;
    }

    public ListingCategory getListingCategory() {
        return listingCategory;
    }

    public void setListingCategory(ListingCategory listingCategory) {
        this.listingCategory = listingCategory;
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
}
