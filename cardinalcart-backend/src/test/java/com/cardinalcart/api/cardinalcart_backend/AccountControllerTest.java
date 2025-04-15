package com.cardinalcart.api.cardinalcart_backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.cardinalcart.api.cardinalcart_backend.account.Account;
import com.cardinalcart.api.cardinalcart_backend.account.AccountRepository;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.Role;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AccountRepository accountRepository;

    private Account testAccount;

    @BeforeEach
    void setup() {
        accountRepository.deleteAll();

        testAccount = new Account();
        testAccount.setFirstName("Test");
        testAccount.setLastName("User");
        testAccount.setSchoolEmail("test" + UUID.randomUUID() + "@usc.edu");
        testAccount.setDateOfBirth(LocalDate.of(2000, 1, 1));
        testAccount.setRole(Role.USER);
        testAccount.setAccountStatus(AccountStatus.ACTIVE);

        testAccount = accountRepository.save(testAccount);
    }

    @Test
    void testGetAccountById() throws Exception {
        mockMvc.perform(get("/api/v1/account/" + testAccount.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.schoolEmail").value(testAccount.getSchoolEmail()));
    }

    @Test
    void testCreateAccount() throws Exception {
        Account newAccount = new Account();
        newAccount.setFirstName("Jane");
        newAccount.setLastName("Doe");
        newAccount.setSchoolEmail("jane" + UUID.randomUUID() + "@usc.edu");
        newAccount.setDateOfBirth(LocalDate.of(1999, 2, 2));
        newAccount.setRole(Role.USER);
        newAccount.setAccountStatus(AccountStatus.ACTIVE);

        mockMvc.perform(post("/api/v1/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newAccount)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.schoolEmail").value(newAccount.getSchoolEmail()));
    }

    @Test
    void testDeleteAccount() throws Exception {
        mockMvc.perform(delete("/api/v1/account/" + testAccount.getId()))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetAccountByEmail() throws Exception {
        mockMvc.perform(get("/api/v1/account/email/" + testAccount.getSchoolEmail()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.schoolEmail").value(testAccount.getSchoolEmail()));
    }

    @Test
    void testUpdateAccountRole() throws Exception {
        mockMvc.perform(put("/api/v1/account/" + testAccount.getId() + "/role")
                        .param("role", "ADMIN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    void testUpdateAccountStatus() throws Exception {
        mockMvc.perform(put("/api/v1/account/" + testAccount.getId() + "/status")
                        .param("accountStatus", "SUSPENDED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountStatus").value("SUSPENDED"));
    }
}
