package com.cardinalcart.api.cardinalcart_backend;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.Role;
import com.cardinalcart.api.cardinalcart_backend.listing.Listing;
import com.cardinalcart.api.cardinalcart_backend.listing.ListingRepository;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingCategory;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingSchools;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;

@SpringBootApplication
public class CardinalcartBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CardinalcartBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(AccountRepository accountRepository, ListingRepository listingRepository) {
        return args -> {
            try {
                Account account = new Account(
                    "Warren",
                    "Buffet",
                    LocalDate.of(2000, 1, 1),
                    "test@gmail.com",
                    LocalDateTime.now(),
                    LocalDateTime.now(),
                    Role.USER,
                    AccountStatus.ACTIVE
                );
                accountRepository.save(account);  
                Listing listing = new Listing();
                listing.setListingName("Iphone");
                listing.setListingDescription("Apple Iphone used");
                listing.setListingPrice(300.14);
                listing.setDatePosted(LocalDateTime.now());
                listing.setAccount(account);
                listing.setIsSold(false);
                listing.setListingCategory(ListingCategory.ELECTRONICS);
                listing.setListingSchool(ListingSchools.USC);

                listingRepository.save(listing);
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}