package com.unihub.api.unihub_backend;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseRepository;

@SpringBootApplication
public class UnihubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnihubBackendApplication.class, args);
    }

   
    @Bean
    public CommandLineRunner loadData(AccountRepository accountRepository, SubleaseRepository subleaseRepository) {
        return args -> {
            try {
                Account account = new Account(
                    "Warren",
                    "Buffett",
                    LocalDate.of(2000, 1, 1),
                    "stonks",
                    5.0f,
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

                Sublease sublease = new Sublease();
                sublease.setAccount(account); 

                sublease.setLeaseName("Wall Street");
                sublease.setLeaseDescription("Beautiful sublease next to the Trading Pit");
                sublease.setLeasePrice(777.77);
                sublease.setDatePosted(LocalDate.now());
                sublease.setLatitude(34.022); 
                sublease.setLongitude(-118.285);
                sublease.setLeaseSchool(Schools.USC); 
                sublease.setLeaseStartDate(LocalDate.now().plusDays(7));
                sublease.setLeaseEndDate(LocalDate.now().plusMonths(2));
                sublease.setLeaseAddress("123 Stock Ave, LA, CA");
                sublease.setAmenities(null); 

                subleaseRepository.save(sublease);

                System.out.println("Seeded test account and sublease");

            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }

}