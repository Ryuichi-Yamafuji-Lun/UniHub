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
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;

@SpringBootApplication
public class CardinalcartBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CardinalcartBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(AccountRepository accountRepository) {
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
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}