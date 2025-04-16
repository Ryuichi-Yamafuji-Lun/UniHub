package com.cardinalcart.api.cardinalcart_backend.listing.publicaccess;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.listing.ListingService;

@RestController
@RequestMapping(path = "api/v2/public/listing")
public class PublicListingController {

    private final ListingService listingService;

    public PublicListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    
}
