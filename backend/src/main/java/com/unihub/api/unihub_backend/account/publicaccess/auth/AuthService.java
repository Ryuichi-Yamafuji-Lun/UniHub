package com.unihub.api.unihub_backend.account.publicaccess.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.account.dto.AccountLoginRequest;
import com.unihub.api.unihub_backend.account.dto.AccountLoginResponse;
import com.unihub.api.unihub_backend.security.jwt.JwtUtil;
import com.unihub.api.unihub_backend.security.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService implements AuthServiceInterface {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Override
    public AccountLoginResponse login(AccountLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getIdentifier(), request.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getIdentifier());
        final String token = jwtUtil.generateToken(userDetails);

        return new AccountLoginResponse(token);
    }

    @Override
    public ResponseEntity<?> googleLogin(Map<String, String> body) {
        String idTokenString = body.get("credential");
        if (idTokenString == null || idTokenString.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Google credential not provided."));
        }

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();

                Optional<Account> optionalAccount = accountRepository.findByEmail(email);

                if (optionalAccount.isPresent()) {
                    Account account = optionalAccount.get();
                    if (account.getUsername() == null || account.getUsername().isBlank()) {
                        return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED)
                                .body(Map.of("message", "User registration is incomplete."));
                    }

                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    String jwt = jwtUtil.generateToken(userDetails);
                    return ResponseEntity.ok(new AccountLoginResponse(jwt));
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(Map.of("message", "No account found for this Google email. Please sign up first."));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid Google ID token."));
            }
        } catch (Exception e) {
            // log.error("Google token verification failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An error occurred during Google token verification."));
        }
    }
}