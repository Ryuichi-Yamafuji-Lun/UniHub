package com.cardinalcart.api.cardinalcart_backend.listing.owneraccess;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.listing.Listing;
import com.cardinalcart.api.cardinalcart_backend.listing.ListingService;

@RestController
@RequestMapping(path = "api/v2/owner/listing")
public class OwnerListingController {

    private final ListingService listingService;

    public OwnerListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<Listing> createListing(@RequestBody Listing newlisting, @PathVariable Long accountId) {
        Listing createdListing = listingService.createListing(newlisting, accountId);
        return ResponseEntity.status(201).body(createdListing);
    }

    @DeleteMapping("/{accountId}/{listingId}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long accountId, @PathVariable Long listingId) {
        try {
            listingService.deleteListing(listingId, accountId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{accountId}/{listingId}")
    public ResponseEntity<Listing> updateListing(@PathVariable Long accountId, @PathVariable Long listingId, @RequestBody Listing updatedListing) {
        try {
            Listing updated = listingService.updateListing(listingId, updatedListing, accountId);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/myListings/{accountId}")
    public ResponseEntity<List<Listing>> searchOwnListing(@PathVariable Long accountId) {
    List<Listing> listings = listingService.getListingByAccountSortedBySold(accountId);
    if (listings.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(listings);
    }

    @GetMapping("/myUnsoldListing/{accountId}")
    public ResponseEntity<List<Listing>> searchOwnActiveListing(@PathVariable Long accountId) {
    List<Listing> listings = listingService.getActiveListingsByAccount(accountId);
    if (listings.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(listings);
    }
}
