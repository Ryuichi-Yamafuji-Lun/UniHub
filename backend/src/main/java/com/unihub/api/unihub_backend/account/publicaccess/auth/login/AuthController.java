package com.unihub.api.unihub_backend.account.publicaccess.auth.login;

import com.unihub.api.unihub_backend.account.dto.AccountLoginRequest;
import com.unihub.api.unihub_backend.account.dto.AccountLoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/auth")
public class AuthController {

    @Autowired
    private AuthServiceInterface authService;

    @PostMapping("/login")
    public ResponseEntity<AccountLoginResponse> login(@RequestBody AccountLoginRequest request) {
        AccountLoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        return authService.googleLogin(body);
    }
}