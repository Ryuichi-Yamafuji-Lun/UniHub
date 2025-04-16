package com.cardinalcart.api.cardinalcart_backend.listing.owneraccess;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.listing.ListingRepository;

@Service
public class OwnerListingService {

    public final ListingRepository listingRepository;

    public OwnerListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    
}
