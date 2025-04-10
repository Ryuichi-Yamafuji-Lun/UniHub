package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;

@Service
public class ListingService {

    public final ListingRepository listingRepository;
    public final AccountRepository accountRepository;


    public ListingService(ListingRepository listingRepository, AccountRepository accountRepository) {
        this.listingRepository = listingRepository;
        this.accountRepository = accountRepository;
    }

    // create listing
    public Listing createListing(Listing listing, Account account) {
        // Do a double take on account and date posted
        listing.setAccount(account);
        listing.setDatePosted(LocalDateTime.now());

        return listingRepository.save(listing);
    }

    // delete listing
    public void deleteListing(Long listingId, Account account) {
        Optional<Listing> listingOpt = listingRepository.findById(listingId);

        if (!listingOpt.isPresent()) {
            throw new IllegalArgumentException("Listing not found");
        }

        Listing listing = listingOpt.get();

        if (!isOwnerOfListing(listing, account)) {
            throw new IllegalArgumentException("You are not authorized to delete this listing");
        }

        listingRepository.delete(listing);
    }

    // check if account exists in the database
    public boolean isValidAccount(Account account) {
        return accountRepository.findById(account.getId()).isPresent();
    }

    // check if user is the owner of the listing
    public boolean isOwnerOfListing(Listing listing, Account account) {
        return listing.getAccount().equals(account);
    }
}
