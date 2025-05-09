package com.unihub.api.unihub_backend;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.listing.Listing;
import com.unihub.api.unihub_backend.listing.ListingRepository;
import com.unihub.api.unihub_backend.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.listingstatus.ListingSchools;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;

@SpringBootApplication
public class UnihubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnihubBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(AccountRepository accountRepository, ListingRepository listingRepository) {
        return args -> {
            try {
                Account account = new Account(
                    "Warren",
                    "Buffet",
                    LocalDate.of(2000, 1, 1),
                    "stonks",
                    5.0f, // float
                    1,
                    "test@gmail.com",
                    LocalDateTime.now(),
                    LocalDateTime.now(),
                    Role.USER,
                    AccountStatus.ACTIVE,
                    (byte) 0, 
                    (byte) 0  
                );
                
                accountRepository.save(account);  
                Listing listing = new Listing();
                listing.setListingName("Iphone");
                listing.setListingDescription("Apple Iphone used");
                listing.setListingPrice(300.14);
                listing.setDatePosted(LocalDateTime.now());
                listing.setBoostedDate(LocalDateTime.now());
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