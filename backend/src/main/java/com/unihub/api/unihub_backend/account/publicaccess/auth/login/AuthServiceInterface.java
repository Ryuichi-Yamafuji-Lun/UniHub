package com.unihub.api.unihub_backend.account.publicaccess.auth.login;

import com.unihub.api.unihub_backend.account.dto.AccountLoginRequest;
import com.unihub.api.unihub_backend.account.dto.AccountLoginResponse;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthServiceInterface {

    AccountLoginResponse login(AccountLoginRequest request);

    ResponseEntity<?> googleLogin(Map<String, String> body);
}
