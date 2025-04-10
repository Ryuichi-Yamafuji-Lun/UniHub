package com.cardinalcart.api.cardinalcart_backend.listing;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cardinalcart.api.cardinalcart_backend.account.Account;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findByListingNameContainingIgnoreCaseAndListingPriceBetween(
        String listName,
        Double minPrice,
        Double maxPrice
    );

    List<Listing> findByAccountOrderByIsSold(Account account);

    List<Listing> findByAccountAndIsSoldFalseOrderByDatePostedDesc(Account account);

    List<Listing> findAllByOrderByDatePostedDesc();

}
