package com.unihub.api.unihub_backend.dormdrop.sublease.publicaccess;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseService;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

@RestController
@RequestMapping(path = "api/v1/public/subleases")
public class PublicSubleaseController {

    private final SubleaseService subleaseService;

    public PublicSubleaseController(SubleaseService subleaseService) {
        this.subleaseService = subleaseService;
    }

    @GetMapping("/{subleaseId}")
    public ResponseEntity<Sublease> getSubleaseById(@PathVariable Long subleaseId) {
        Optional<Sublease> sublease = subleaseService.findSubleaseById(subleaseId);
        return sublease.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Sublease>> getAllSublease() {
        List<Sublease> sublease = subleaseService.getAllSublease();
        if (sublease.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sublease);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Sublease>> searchSubleases(
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) Double latMin,
        @RequestParam(required = false) Double latMax,
        @RequestParam(required = false) Double lngMin,
        @RequestParam(required = false) Double lngMax,
        @RequestParam(required = false) String leaseName,
        @RequestParam(required = false) Set<SubleaseAmenity> amenities
    ) {
        List<Sublease> subleases = subleaseService.searchSublease(maxPrice, latMin, latMax, lngMin, lngMax, leaseName, amenities);
        return subleases.isEmpty() 
            ? ResponseEntity.noContent().build()
            : ResponseEntity.ok(subleases);
    }
}
