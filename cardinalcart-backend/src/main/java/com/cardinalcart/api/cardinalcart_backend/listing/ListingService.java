package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;

@Service
public class ListingService {

    public final ListingRepository listingRepository;
    public final AccountRepository accountRepository;


    public ListingService(ListingRepository listingRepository, AccountRepository accountRepository) {
        this.listingRepository = listingRepository;
        this.accountRepository = accountRepository;
    }

    // check if account exists in the database
    public boolean isValidAccount(Account account) {
        return accountRepository.findById(account.getId()).isPresent();
    }

    // check if account exists and is active
    private void validateAccount(Account account) {
        if (!isValidAccount(account) || !account.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalArgumentException("Account is invalid or not active");
        }
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfListing(Listing listing, Account account) {
        return listing.getAccount().equals(account);
    }

    // create listing
    @Transactional
    public Listing createListing(Listing listing, Account account) {
        validateAccount(account);

        // Do a double take on account and date posted
        listing.setAccount(account);
        listing.setDatePosted(LocalDateTime.now());

        return listingRepository.save(listing);
    }

    // delete listing
    @Transactional
    public void deleteListing(Long listingId, Account account) {
        Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        if (!isOwnerOfListing(listing, account)) {
            throw new IllegalArgumentException("You are not authorized to delete this listing");
        }

        if (listing.getIsSold()) {
            throw new IllegalArgumentException("Cannot delete sold listing");
        }

        listingRepository.delete(listing);
    }

    // update listing
    @Transactional
    public Listing updateListing(Long listingId, Listing updatedlisting, Account account) {
        Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new IllegalArgumentException("Listing is not found"));

        if (!isOwnerOfListing(listing, account)) {
            throw new IllegalArgumentException("You are not authorized to update this listing");
        }

        if (listing.getIsSold()) {
            throw new IllegalArgumentException("Cannot update sold listing");
        }

        listing.setListingName(updatedlisting.getListingName());
        listing.setListingPrice(updatedlisting.getListingPrice());
        listing.setListingDescription(updatedlisting.getListingDescription());
        listing.setListingImages(updatedlisting.getListingImages());

        return listingRepository.save(listing);
    }

    // find listing by id

}
