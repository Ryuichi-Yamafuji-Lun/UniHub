package com.unihub.api.unihub_backend.cardinalcart.listing.owneraccess;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.cardinalcart.listing.Listing;
import com.unihub.api.unihub_backend.cardinalcart.listing.ListingService;
import com.unihub.api.unihub_backend.cardinalcart.listing.dto.ListingRequest;
import com.unihub.api.unihub_backend.cardinalcart.listing.dto.ListingResponseDTO;

import jakarta.validation.Valid;

// CardinalCart is not launched yet; remove denyAll() to enable these routes.
// Ownership is always resolved from the authenticated caller, never from the path.
@RestController
@RequestMapping(path = "api/v2/owner/accounts")
@PreAuthorize("denyAll()")
public class OwnerListingController {

    private final ListingService listingService;

    public OwnerListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping("/me/listings")
    public ResponseEntity<ListingResponseDTO> createListing(@Valid @RequestBody ListingRequest newListing) {
        Listing createdListing = listingService.createListing(newListing);
        return ResponseEntity.status(201).body(ListingResponseDTO.from(createdListing));
    }

    @DeleteMapping("/me/listings/{listingId}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long listingId) {
        listingService.deleteListing(listingId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me/listings/{listingId}")
    public ResponseEntity<ListingResponseDTO> updateListing(@PathVariable Long listingId, @Valid @RequestBody ListingRequest updatedListing) {
        Listing updated = listingService.updateListing(listingId, updatedListing);
        return ResponseEntity.ok(ListingResponseDTO.from(updated));
    }

    @PutMapping("/me/listings/{listingId}/sold")
    public ResponseEntity<ListingResponseDTO> markListingSold(@PathVariable Long listingId) {
        Listing sold = listingService.markListingSold(listingId);
        return ResponseEntity.ok(ListingResponseDTO.from(sold));
    }

    @GetMapping("/me/listings")
    public ResponseEntity<List<ListingResponseDTO>> searchOwnListing() {
        List<ListingResponseDTO> listings = listingService.getOwnListingsSortedBySold().stream()
            .map(ListingResponseDTO::from)
            .toList();
        return listings.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(listings);
    }

    @GetMapping("/me/listings/unsold")
    public ResponseEntity<List<ListingResponseDTO>> searchOwnActiveListing() {
        List<ListingResponseDTO> listings = listingService.getOwnActiveListings().stream()
            .map(ListingResponseDTO::from)
            .toList();
        return listings.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(listings);
    }
}
