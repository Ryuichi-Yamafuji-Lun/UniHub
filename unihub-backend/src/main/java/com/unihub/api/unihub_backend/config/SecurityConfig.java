package com.unihub.api.unihub_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**")) // allow H2
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))         // allow H2 iframe
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll()           
                .requestMatchers("/api/v1/account/**").permitAll()       
                .anyRequest().permitAll()                                
            );
        return http.build();
    }
}
