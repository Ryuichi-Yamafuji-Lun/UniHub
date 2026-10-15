package com.unihub.api.unihub_backend.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import javax.crypto.SecretKey;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.accountstatusrole.Role;
import com.unihub.api.unihub_backend.cardinalcart.listing.Listing;
import com.unihub.api.unihub_backend.cardinalcart.listing.ListingRepository;
import com.unihub.api.unihub_backend.cardinalcart.listing.ListingService;
import com.unihub.api.unihub_backend.cardinalcart.listing.dto.ListingRequest;
import com.unihub.api.unihub_backend.cardinalcart.listingstatus.ListingCategory;
import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseRepository;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseRoomType;
import com.unihub.api.unihub_backend.security.jwt.JwtUtil;
import com.unihub.api.unihub_backend.security.service.CustomUserDetailsService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@SpringBootTest
@AutoConfigureMockMvc
class AuthorizationIntegrationTests {

    @Autowired private MockMvc mockMvc;
    @Autowired private AccountRepository accountRepository;
    @Autowired private SubleaseRepository subleaseRepository;
    @Autowired private ListingRepository listingRepository;
    @Autowired private ListingService listingService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private CustomUserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    private Account owner;
    private Account other;

    @BeforeEach
    void setUp() {
        owner = accountRepository.save(account("owner"));
        other = accountRepository.save(account("other"));
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
        listingRepository.deleteAll();
        subleaseRepository.deleteAll();
        accountRepository.deleteAll();
    }

    /* JWT filter */

    @Test
    void publicRouteIgnoresExpiredToken() throws Exception {
        subleaseRepository.save(sublease(owner));
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        String expired = Jwts.builder()
            .setSubject(owner.getEmail())
            .setIssuedAt(new Date(System.currentTimeMillis() - 7_200_000))
            .setExpiration(new Date(System.currentTimeMillis() - 3_600_000))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        mockMvc.perform(get("/api/v1/public/subleases/all").header("Authorization", "Bearer " + expired))
            .andExpect(status().isOk());
    }

    @Test
    void publicRouteIgnoresMalformedToken() throws Exception {
        subleaseRepository.save(sublease(owner));

        mockMvc.perform(get("/api/v1/public/subleases/all").header("Authorization", "Bearer not-a-jwt"))
            .andExpect(status().isOk());
    }

    @Test
    void protectedRouteRejectsMalformedToken() throws Exception {
        mockMvc.perform(get("/api/v1/owner/accounts/me/subleases").header("Authorization", "Bearer not-a-jwt"))
            .andExpect(status().isForbidden());
    }

    /* DormDrop ownership */

    @Test
    void nonOwnerCannotDeleteSublease() throws Exception {
        Sublease sublease = subleaseRepository.save(sublease(owner));

        mockMvc.perform(delete("/api/v1/owner/accounts/me/subleases/" + sublease.getId()).header("Authorization", bearer(other)))
            .andExpect(status().isForbidden());

        assertThat(subleaseRepository.existsById(sublease.getId())).isTrue();
    }

    @Test
    void ownerCanDeleteSublease() throws Exception {
        Sublease sublease = subleaseRepository.save(sublease(owner));

        mockMvc.perform(delete("/api/v1/owner/accounts/me/subleases/" + sublease.getId()).header("Authorization", bearer(owner)))
            .andExpect(status().isNoContent());

        assertThat(subleaseRepository.existsById(sublease.getId())).isFalse();
    }

    @Test
    void nonOwnerCannotUpdateSublease() throws Exception {
        Sublease sublease = subleaseRepository.save(sublease(owner));

        mockMvc.perform(put("/api/v1/owner/accounts/me/subleases/" + sublease.getId())
                .header("Authorization", bearer(other))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"leaseName\":\"hijacked\"}"))
            .andExpect(status().isForbidden());

        assertThat(subleaseRepository.findById(sublease.getId()).orElseThrow().getLeaseName()).isEqualTo("Test Lease");
    }

    @Test
    void updatingMissingSubleaseReturnsNotFound() throws Exception {
        mockMvc.perform(put("/api/v1/owner/accounts/me/subleases/999999")
                .header("Authorization", bearer(owner))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"leaseName\":\"anything\"}"))
            .andExpect(status().isNotFound());
    }

    @Test
    void unverifiedAccountCannotUseOwnerRoutes() throws Exception {
        Account unverified = account("unverified");
        unverified.setAccountStatus(AccountStatus.UNVERIFIED);
        unverified = accountRepository.save(unverified);

        mockMvc.perform(get("/api/v1/owner/accounts/me/subleases").header("Authorization", bearer(unverified)))
            .andExpect(status().isForbidden());
    }

    /* DormDrop search */

    @Test
    void searchWithoutSizeFiltersReturnsListings() throws Exception {
        subleaseRepository.save(sublease(owner));

        mockMvc.perform(get("/api/v1/public/subleases/search"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].leaseName").value("Test Lease"));
    }

    /* CardinalCart */

    @Test
    void cardinalCartRoutesStayDisabled() throws Exception {
        mockMvc.perform(get("/api/v2/public/listing/all")).andExpect(status().isForbidden());
        mockMvc.perform(get("/api/v2/owner/accounts/me/listings").header("Authorization", bearer(owner)))
            .andExpect(status().isForbidden());
    }

    @Test
    void nonOwnerCannotUpdateListing() {
        Listing listing = listingRepository.save(listing(owner));
        actAs(other);

        ListingRequest request = listingRequest("hijacked");
        assertThatThrownBy(() -> listingService.updateListing(listing.getId(), request))
            .isInstanceOfSatisfying(ResponseStatusException.class,
                ex -> assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN));

        assertThat(listingRepository.findById(listing.getId()).orElseThrow().getListingName()).isEqualTo("Desk");
    }

    @Test
    void createdListingBelongsToCaller() {
        actAs(owner);

        Listing created = listingService.createListing(listingRequest("Lamp"));

        assertThat(created.getAccount().getId()).isEqualTo(owner.getId());
        assertThat(created.getIsSold()).isFalse();
    }

    /* Fixtures */

    private String bearer(Account account) {
        return "Bearer " + jwtUtil.generateToken(userDetailsService.loadUserByUsername(account.getEmail()));
    }

    private void actAs(Account account) {
        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(account.getEmail(), null, Set.of()));
    }

    private static Account account(String name) {
        Account account = new Account();
        account.setEmail(name + "@usc.edu");
        account.setUsername(name);
        account.setFirstName(name);
        account.setLastName("Test");
        account.setSchool(Schools.USC);
        account.setRoles(Set.of(Role.ROLE_USER));
        account.setAccountStatus(AccountStatus.ACTIVE);
        account.setCreatedAt(LocalDateTime.now());
        return account;
    }

    private static Sublease sublease(Account account) {
        Sublease sublease = new Sublease();
        sublease.setAccount(account);
        sublease.setLeaseName("Test Lease");
        sublease.setDatePosted(LocalDate.now());
        sublease.setLeaseStartDate(LocalDate.now().plusDays(10));
        sublease.setLeaseEndDate(LocalDate.now().plusDays(100));
        sublease.setLeaseSchool(Set.of(Schools.USC));
        sublease.setAmenities(Set.of(SubleaseAmenity.values()[0]));
        sublease.setRoomType(Set.of(SubleaseRoomType.values()[0]));
        sublease.setLeasePrice(1200.0);
        sublease.setNumRoom((byte) 1);
        sublease.setNumBath((byte) 1);
        sublease.setRoomWidth(10.0);
        sublease.setRoomDepth(12.0);
        sublease.setLeaseDescription("A room");
        sublease.setLeaseAddress("123 Test St");
        sublease.setLatitude(34.02);
        sublease.setLongitude(-118.28);
        return sublease;
    }

    private static Listing listing(Account account) {
        Listing listing = new Listing();
        listing.setAccount(account);
        listing.setListingName("Desk");
        listing.setListingPrice(40.0);
        listing.setListingSchool(Schools.USC);
        listing.setListingCategory(ListingCategory.FURNITURE);
        listing.setIsSold(false);
        listing.setDatePosted(LocalDateTime.now());
        listing.setBoostedDate(LocalDateTime.now());
        return listing;
    }

    private static ListingRequest listingRequest(String name) {
        ListingRequest request = new ListingRequest();
        request.setListingName(name);
        request.setListingPrice(25.0);
        request.setListingSchool(Schools.USC);
        request.setListingCategory(ListingCategory.FURNITURE);
        return request;
    }
}
