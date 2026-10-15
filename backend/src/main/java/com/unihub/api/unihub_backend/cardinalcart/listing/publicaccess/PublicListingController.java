package com.unihub.api.unihub_backend.cardinalcart.listing.publicaccess;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.cardinalcart.listing.ListingService;
import com.unihub.api.unihub_backend.cardinalcart.listing.dto.ListingResponseDTO;
import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;

@RestController
@RequestMapping(path = "api/v2/public/listing")
// CardinalCart is not launched yet; remove denyAll() to enable these routes.
@PreAuthorize("denyAll()")
public class PublicListingController {

    private final ListingService listingService;

    public PublicListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<ListingResponseDTO> getListingById(@PathVariable Long listingId) {
        return listingService.findListingById(listingId)
            .map(listing -> ResponseEntity.ok(ListingResponseDTO.from(listing)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<ListingResponseDTO>> getAllListing() {
        List<ListingResponseDTO> listings = listingService.getAllListings().stream().map(ListingResponseDTO::from).toList();
        if (listings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ListingResponseDTO>> searchListing(
        @RequestParam(required = false) String listingName,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) Schools school,
        @RequestParam(required = false) ListingCategory category
    ) {
        List<ListingResponseDTO> listings = listingService.searchListing(listingName, minPrice, maxPrice, school, category)
            .stream().map(ListingResponseDTO::from).toList();
        return listings.isEmpty()
            ? ResponseEntity.noContent().build()
            : ResponseEntity.ok(listings);
    }

}
