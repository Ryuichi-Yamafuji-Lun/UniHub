package com.unihub.api.unihub_backend.cardinalcart.listing;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.cardinalcart.listing.dto.ListingRequest;
import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.security.utils.CurrentAccountProvider;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final CurrentAccountProvider currentAccountProvider;

    public ListingService(ListingRepository listingRepository, CurrentAccountProvider currentAccountProvider) {
        this.listingRepository = listingRepository;
        this.currentAccountProvider = currentAccountProvider;
    }

    // check if user is the owner of the listing
    public boolean isOwnerOfListing(Listing listing, Account account) {
        return listing.getAccount().getId().equals(account.getId());
    }

    // load a listing and confirm the caller owns it
    private Listing findOwnedListing(Long listingId) {
        Listing listing = listingRepository.findById(listingId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Listing not found"));
        Account account = currentAccountProvider.getCurrentUserAccount();

        if (!isOwnerOfListing(listing, account)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to modify this listing");
        }
        return listing;
    }

    private void applyRequest(Listing listing, ListingRequest request) {
        listing.setListingName(request.getListingName());
        listing.setListingPrice(request.getListingPrice());
        listing.setListingSchool(request.getListingSchool());
        listing.setListingCategory(request.getListingCategory());
        listing.setListingImages(request.getListingImages());
        listing.setListingDescription(request.getListingDescription());
    }

    // create listing
    @Transactional
    public Listing createListing(ListingRequest request) {
        Account account = currentAccountProvider.getCurrentUserAccount();

        Listing listing = new Listing();
        applyRequest(listing, request);
        listing.setAccount(account);
        listing.setDatePosted(LocalDateTime.now());
        listing.setBoostedDate(listing.getDatePosted());
        listing.setIsSold(false);

        return listingRepository.save(listing);
    }

    // delete listing
    @Transactional
    public void deleteListing(Long listingId) {
        Listing listing = findOwnedListing(listingId);

        if (listing.getIsSold()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete sold listing");
        }

        listingRepository.delete(listing);
    }

    // update listing
    @Transactional
    public Listing updateListing(Long listingId, ListingRequest request) {
        Listing listing = findOwnedListing(listingId);

        if (listing.getIsSold()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot update sold listing");
        }

        applyRequest(listing, request);
        return listingRepository.save(listing);
    }

    // mark listing as sold
    @Transactional
    public Listing markListingSold(Long listingId) {
        Listing listing = findOwnedListing(listingId);
        listing.setIsSold(true);
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
        return listingRepository.findAllByOrderByBoostedDateDesc();
    }

    // retrieve all listing with name and price range
    @Transactional(readOnly = true)
    public List<Listing> searchListing(String listName, Double minPrice, Double maxPrice, Schools school, ListingCategory category) {
        if (listName == null) listName = "";
        if (minPrice == null || minPrice < 0) minPrice = 0.0;
        if (maxPrice == null) maxPrice = Double.MAX_VALUE;
        if (maxPrice < minPrice) maxPrice = minPrice;

        return listingRepository.searchListings(listName, minPrice, maxPrice, school, category);
    }

    /*
     * OWNER LISTING ACCESS
     * getOwnListingsSortedBySold (get all listings including sold ones for owners)
     * getOwnActiveListings (get unsold listings for owners)
     */

    // get all of the caller's listings sorted by sold status
    @Transactional(readOnly = true)
    public List<Listing> getOwnListingsSortedBySold() {
        Account account = currentAccountProvider.getCurrentUserAccount();
        return listingRepository.findByAccountOrderByIsSold(account);
    }

    // get only the caller's active (unsold) listings, sorted by date posted
    @Transactional(readOnly = true)
    public List<Listing> getOwnActiveListings() {
        Account account = currentAccountProvider.getCurrentUserAccount();
        return listingRepository.findByAccountAndIsSoldFalseOrderByBoostedDateDesc(account);
    }
}
