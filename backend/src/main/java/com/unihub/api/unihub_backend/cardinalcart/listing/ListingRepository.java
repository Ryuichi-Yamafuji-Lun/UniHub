package com.unihub.api.unihub_backend.cardinalcart.listing;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    @Query("SELECT l FROM Listing l " +
       "WHERE LOWER(l.listingName) LIKE LOWER(CONCAT('%', :listingName, '%')) " +
       "AND l.listingPrice BETWEEN :minPrice AND :maxPrice " +
       "AND (:school IS NULL OR l.listingSchool = :school) " +
       "AND (:category IS NULL OR l.listingCategory = :category)")
       
    List<Listing> searchListings(
        @Param("listingName") String listingName,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("school") Schools school,
        @Param("category") ListingCategory category
    );

    List<Listing> findByAccountOrderByIsSold(Account account);

    List<Listing> findByAccountAndIsSoldFalseOrderByBoostedDateDesc(Account account);

    List<Listing> findAllByOrderByBoostedDateDesc();

}
