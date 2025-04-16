package com.cardinalcart.api.cardinalcart_backend.listing.publicaccess;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.listing.ListingRepository;

@Service
public class PublicListingService {

    public final ListingRepository listingRepository;

    public PublicListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    
}
