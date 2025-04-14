package com.cardinalcart.api.cardinalcart_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import com.cardinalcart.api.cardinalcart_backend.account.AccountController;

@WebMvcTest(AccountController.class)
public class AccountControllerTest {

        @Autowired
        private MockMvc mockMvc;
}
