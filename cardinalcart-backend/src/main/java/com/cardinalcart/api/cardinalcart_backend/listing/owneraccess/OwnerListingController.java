package com.cardinalcart.api.cardinalcart_backend.listing.owneraccess;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.listing.ListingService;

@RestController
@RequestMapping(path = "api/v2/owner/listing")
public class OwnerListingController {

    private final ListingService listingService;

    public OwnerListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    
}
