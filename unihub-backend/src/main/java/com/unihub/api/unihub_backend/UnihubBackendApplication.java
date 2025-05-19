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
                Sublease sublease = new Sublease();
                sublease.setLeaseName("Wall Street");
                sublease.setDatePosted(LocalDateTime.now());
                sublease.setLeaseDescription("Lease Description");
                sublease.setLeasePrice(7.77);
                
                

                subleaseRepository.save(sublease);
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}