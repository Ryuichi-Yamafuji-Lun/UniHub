package com.cardinalcart.api.cardinalcart_backend.listing.publicaccess;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.listing.Listing;
import com.cardinalcart.api.cardinalcart_backend.listing.ListingService;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingCategory;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingSchools;

@RestController
@RequestMapping(path = "api/v2/public/listing")
public class PublicListingController {

    private final ListingService listingService;

    public PublicListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long listingId) {
        Optional<Listing> listing = listingService.findListingById(listingId);
        return listing.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Listing>> getAllListing() {
        List<Listing> listings = listingService.getAllListings();
        if (listings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Listing>> searchListing(
        @RequestParam String listingName,
        @RequestParam Double minPrice,
        @RequestParam Double maxPrice,
        @RequestParam ListingSchools school,
        @RequestParam ListingCategory category
    ) {
        List<Listing> listings = listingService.searchListing(listingName, minPrice, maxPrice, school, category);
        if (listings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listings);
    }

}
