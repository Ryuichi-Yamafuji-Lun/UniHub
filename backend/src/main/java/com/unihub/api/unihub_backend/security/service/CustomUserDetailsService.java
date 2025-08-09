package com.unihub.api.unihub_backend.security.service;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(identifier)
                .or(() -> accountRepository.findByUsername(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities = account.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        String password = account.getPassword() != null ? account.getPassword() : "";

        return new org.springframework.security.core.userdetails.User(
                account.getEmail(),
                password,
                authorities
        );
    }
} 