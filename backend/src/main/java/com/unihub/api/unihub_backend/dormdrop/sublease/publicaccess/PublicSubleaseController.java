package com.unihub.api.unihub_backend.dormdrop.sublease.publicaccess;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseService;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseResponseDTO;
import com.unihub.api.unihub_backend.dormdrop.sublease.mapper.SubleaseMapper;
import com.unihub.api.unihub_backend.dormdrop.subleasestatus.SubleaseAmenity;

@RestController
@RequestMapping(path = "api/v1/public/subleases")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class PublicSubleaseController {

    private final SubleaseService subleaseService;
    private final SubleaseMapper subleaseMapper;

    public PublicSubleaseController(SubleaseService subleaseService, SubleaseMapper subleaseMapper) {
        this.subleaseService = subleaseService;
        this.subleaseMapper = subleaseMapper;
    }

    @GetMapping("/{subleaseId}")
    public ResponseEntity<SubleaseResponseDTO> getSubleaseById(@PathVariable Long subleaseId) {
        Optional<Sublease> sublease = subleaseService.findSubleaseById(subleaseId);
        return sublease.map(s -> ResponseEntity.ok(subleaseMapper.toResponse(s))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubleaseResponseDTO>> getAllSublease() {
        List<SubleaseResponseDTO> sublease = subleaseService.getAllSublease();
        if (sublease.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(sublease);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SubleaseResponseDTO>> searchSubleases(
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) Double latMin,
        @RequestParam(required = false) Double latMax,
        @RequestParam(required = false) Double lngMin,
        @RequestParam(required = false) Double lngMax,
        @RequestParam(required = false) Double widthMin,
        @RequestParam(required = false) Double widthMax,
        @RequestParam(required = false) Double depthMin,
        @RequestParam(required = false) Double depthMax,
        @RequestParam(required = false) String leaseName,
        @RequestParam(required = false) Set<SubleaseAmenity> amenities
    ) {
        List<SubleaseResponseDTO> subleases = subleaseService.searchSublease(maxPrice, latMin, latMax, lngMin, lngMax, widthMin, widthMax, depthMin, depthMax, leaseName, amenities);
        return subleases.isEmpty() 
            ? ResponseEntity.noContent().build()
            : ResponseEntity.ok(subleases);
    }
}
