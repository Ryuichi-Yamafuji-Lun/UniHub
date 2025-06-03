package com.unihub.api.unihub_backend.account.publicaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.account.dto.AccountLoginRequest;
import com.unihub.api.unihub_backend.account.dto.AccountLoginResponse;
import com.unihub.api.unihub_backend.security.jwt.JwtUtil;
import com.unihub.api.unihub_backend.security.service.CustomUserDetailsService;

@RestController
@RequestMapping("/api/v1/public/auth")
public class AuthController {
  
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AccountLoginResponse> login(@RequestBody AccountLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdentifier(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getIdentifier());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AccountLoginResponse(token));
    }
}