package com.cardinalcart.api.cardinalcart_backend;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.cardinalcart.api.cardinalcart_backend.listing.Listing;
import com.cardinalcart.api.cardinalcart_backend.listing.ListingController;
import com.cardinalcart.api.cardinalcart_backend.listing.ListingService;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingCategory;
import com.cardinalcart.api.cardinalcart_backend.listingstatus.ListingSchools;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = ListingController.class)
@Import(ListingControllerTest.MockConfig.class)
public class ListingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ListingService listingService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public ListingService listingService() {
            return mock(ListingService.class);
        }

        @Bean
        public ListingController listingController(ListingService listingService) {
            return new ListingController(listingService);
        }
    }

    @Test
    void testCreateListing() throws Exception {
        Listing listing = new Listing();
        listing.setListingName("Bike");

        when(listingService.createListing(any(Listing.class), eq(1L))).thenReturn(listing);

        mockMvc.perform(post("/api/v1/listing/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(listing)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.listingName").value("Bike"));
    }

    @Test
    void testGetListingById() throws Exception {
        Listing listing = new Listing();
        listing.setListingName("Macbook");

        when(listingService.findListingById(1L)).thenReturn(Optional.of(listing));

        mockMvc.perform(get("/api/v1/listing/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.listingName").value("Macbook"));
    }

    @Test
    void testSearchListing() throws Exception {
        Listing item = new Listing();
        item.setListingName("Chair");

        when(listingService.searchListing(
                eq("Chair"),
                anyDouble(),
                anyDouble(),
                eq(ListingSchools.USC),
                eq(ListingCategory.FURNITURE))
        ).thenReturn(List.of(item));

        mockMvc.perform(get("/api/v1/listing/search")
                        .param("listingName", "Chair")
                        .param("minPrice", "10")
                        .param("maxPrice", "100")
                        .param("school", "USC")
                        .param("category", "FURNITURE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].listingName").value("Chair"));
    }
}
