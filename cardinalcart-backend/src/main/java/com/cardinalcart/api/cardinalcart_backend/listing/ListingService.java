package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.account.Account;

@Service
public class ListingService {

    public final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    // create listing
    public Listing createListing(Listing listing, Account account) {
        // Do a double take on account and date posted
        listing.setAccount(account);
        listing.setDatePosted(LocalDateTime.now());
        
        return listingRepository.save(listing);
    }

}
