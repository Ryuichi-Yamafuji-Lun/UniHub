package com.cardinalcart.api.cardinalcart_backend.listing;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    // check if account is active
    private void validateAccount(Account account) {
        if (!account.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalArgumentException("Account is invalid");
        }
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfListing(Listing listing, Account account) {
        return listing.getAccount().equals(account);
    }

    // create listing
    @Transactional
    public Listing createListing(Listing listing, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Create Listing: account not found"));

        validateAccount(account);

        // Do a double take on account and date posted
        listing.setAccount(account);
        listing.setDatePosted(LocalDateTime.now());
        listing.setIsSold(false);

        return listingRepository.save(listing);
    }

    // delete listing
    @Transactional
    public void deleteListing(Long listingId, Long accountId) {
        Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Delete Listing: account not found"));

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
    public Listing updateListing(Long listingId, Listing updatedlisting, Long accountId) {
        Listing listing = listingRepository.findById(listingId).orElseThrow(() -> new IllegalArgumentException("Listing is not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Update Listing: account not found"));

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
    /*
     * PUBLIC USER ACCESS
     * findListingById (finds specific listing by listing id)
     * searchListing (finds listings with criterias)
     */

    // find listing by id
    @Transactional(readOnly = true)
    public Optional<Listing> findListingById(Long id) {
        return listingRepository.findById(id);
    }

    // retrieve all listing ordered by date
    @Transactional(readOnly = true)
    public List<Listing> getAllListings() {
        return listingRepository.findAllByOrderByDatePostedDesc();
    }

    // retrieve all listing with name and price range
    @Transactional(readOnly = true)
    public List<Listing> searchListing(String listName, Double minPrice, Double maxPrice) {
        if (minPrice == null) minPrice = 0.0;
        if (maxPrice == null) maxPrice = Double.MAX_VALUE;

        return listingRepository.findByListingNameContainingIgnoreCaseAndListingPriceBetween(listName, minPrice, maxPrice);
    }

    /*
     * OWNER LISTING ACCESS
     * getListingByAccountSortedBySold (get all listings including sold ones for owners)
     * getActiveListingsByAccount (get unsold listings for owners)
     */

    // get all listings for an account sorted by sold status
    @Transactional(readOnly = true)
    public List<Listing> getListingByAccountSortedBySold(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Get All Owned Listing: account not found"));
        return listingRepository.findByAccountOrderByIsSold(account);
    }

    // get only active (unsold) listing for an account, sorted by date posted
    @Transactional(readOnly = true)
    public List<Listing> getActiveListingsByAccount(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Get All Owned Unsold Listing: account not found"));
        return listingRepository.findByAccountAndIsSoldFalseOrderByDatePostedDesc(account);
    }
}
