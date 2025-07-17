package com.unihub.api.unihub_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UnihubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnihubBackendApplication.class, args);
    }
}