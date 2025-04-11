package com.cardinalcart.api.cardinalcart_backend.listing;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cardinalcart.api.cardinalcart_backend.account.Account;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    @Query("SELECT l FROM Listing l " +
       "WHERE LOWER(l.listingName) LIKE LOWER(CONCAT('%', :listingName, '%')) " +
       "AND l.listingPrice BETWEEN :minPrice AND :maxPrice " +
       "AND (:school IS NULL OR l.school = :school) " +
       "AND (:category IS NULL OR l.category = :category)")
    List<Listing> searchListings(
        @Param("listingName") String listingName,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("school") String school,
        @Param("category") String category
    );

    List<Listing> findByAccountOrderByIsSold(Account account);

    List<Listing> findByAccountAndIsSoldFalseOrderByDatePostedDesc(Account account);

    List<Listing> findAllByOrderByDatePostedDesc();

}
