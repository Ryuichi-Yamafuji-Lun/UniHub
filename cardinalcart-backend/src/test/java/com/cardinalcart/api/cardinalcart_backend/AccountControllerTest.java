package com.cardinalcart.api.cardinalcart_backend;

import com.cardinalcart.api.cardinalcart_backend.account.*;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatus;
import com.cardinalcart.api.cardinalcart_backend.accountstatusrole.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AccountController.class)
public class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService accountService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private Account getSampleAccount() {
        return new Account(
                "John", "Doe", LocalDate.of(2000, 1, 1), "pic.png",
                5.0f, 1, "johndoe@usc.edu",
                LocalDateTime.now(), LocalDateTime.now(),
                Role.USER, AccountStatus.ACTIVE, (byte) 0, (byte) 0
        );
    }

    @Test
    public void testCreateAccount() throws Exception {
        Account account = getSampleAccount();
        when(accountService.createAccount(any(Account.class))).thenReturn(account);

        mockMvc.perform(post("/api/v1/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(account)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.schoolEmail").value("johndoe@usc.edu"));
    }

    @Test
    public void testDeleteAccountSuccess() throws Exception {
        doNothing().when(accountService).deleteAccount(1L);

        mockMvc.perform(delete("/api/v1/account/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteAccountFailure() throws Exception {
        doThrow(new RuntimeException("Not found")).when(accountService).deleteAccount(1L);

        mockMvc.perform(delete("/api/v1/account/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAccountById() throws Exception {
        Account account = getSampleAccount();
        when(accountService.findAccountById(1L)).thenReturn(Optional.of(account));

        mockMvc.perform(get("/api/v1/account/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.schoolEmail").value("johndoe@usc.edu"));
    }

    @Test
    public void testGetAccountByIdNotFound() throws Exception {
        when(accountService.findAccountById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/account/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAccountBySchoolEmail() throws Exception {
        Account account = getSampleAccount();
        when(accountService.findAccountBySchoolEmail("johndoe@usc.edu"))
                .thenReturn(Optional.of(account));

        mockMvc.perform(get("/api/v1/account/email/johndoe@usc.edu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    public void testGetAccountBySchoolEmailNotFound() throws Exception {
        when(accountService.findAccountBySchoolEmail("johndoe@usc.edu"))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/account/email/johndoe@usc.edu"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateAccountRole() throws Exception {
        Account account = getSampleAccount();
        account.setRole(Role.ADMIN);
        when(accountService.updateAccountRole(1L, Role.ADMIN)).thenReturn(account);

        mockMvc.perform(put("/api/v1/account/1/role?role=ADMIN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    public void testUpdateAccountStatus() throws Exception {
        Account account = getSampleAccount();
        account.setAccountStatus(AccountStatus.SUSPENDED);
        when(accountService.updateAccountStatus(1L, AccountStatus.SUSPENDED)).thenReturn(account);

        mockMvc.perform(put("/api/v1/account/1/status?accountStatus=SUSPENDED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountStatus").value("SUSPENDED"));
    }

    @Test
    public void testGetAccountRoleAndStatus() throws Exception {
        when(accountService.getAccountRoleAndStatus(1L))
                .thenReturn(new com.cardinalcart.api.cardinalcart_backend.accountstatusrole.AccountStatusRoleResponse(Role.USER, AccountStatus.ACTIVE));

        mockMvc.perform(get("/api/v1/account/1/role-status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.accountStatus").value("ACTIVE"));
    }
}
