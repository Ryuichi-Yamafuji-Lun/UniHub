package com.cardinalcart.api.cardinalcart_backend.listing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.account.AccountService;

@RestController
@RequestMapping(path = "api/v1/listing")
public class ListingController {

    private final ListingService listingService;
    private final AccountService accountService;

    public ListingController(ListingService listingService, AccountService accountService) {
        this.listingService = listingService;
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing, @PathVariable Long accountId) {
        Listing createdListing = listingService.createListing(listing, accountId);
        return ResponseEntity.status(201).body(createdListing);
    }

}
