package com.unihub.api.unihub_backend.dormdrop.sublease.owneraccess;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseService;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseRegistrationRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseResponseDTO;
import com.unihub.api.unihub_backend.dormdrop.sublease.dto.SubleaseUpdateRequest;
import com.unihub.api.unihub_backend.dormdrop.sublease.mapper.SubleaseMapper;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/v1/owner/accounts")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class OwnerSubleaseController {

    private final SubleaseService subleaseService;
    private final SubleaseMapper subleaseMapper;

    public OwnerSubleaseController(SubleaseService subleaseService, SubleaseMapper subleaseMapper) {
        this.subleaseService = subleaseService;
        this.subleaseMapper = subleaseMapper;
    }

    @PostMapping("/me/subleases")
    public ResponseEntity<SubleaseResponseDTO> createSublease(@Valid @RequestBody SubleaseRegistrationRequest newSublease) {
        Sublease createSublease = subleaseService.createSublease(newSublease);
        return ResponseEntity.status(201).body(subleaseMapper.toResponse(createSublease));
    }

    @DeleteMapping("/me/subleases/{subleaseId}")
    public ResponseEntity<Void> deleteSublease(@PathVariable Long subleaseId) {
        try {
            subleaseService.deleteSubLease(subleaseId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/me/subleases/{subleaseId}")
    public ResponseEntity<SubleaseResponseDTO> updateSublease( @PathVariable Long subleaseId, @Valid @RequestBody SubleaseUpdateRequest updatedSublease) {
        try {
            Sublease updated = subleaseService.updateSublease(subleaseId, updatedSublease);
            return ResponseEntity.ok(subleaseMapper.toResponse(updated));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/me/subleases")
    public ResponseEntity<List<SubleaseResponseDTO>> searchOwnSublease(@RequestParam(required = false) Integer limit) {

        List<SubleaseResponseDTO> subleases = subleaseService.getSubleaseByAccountOrderedByDate(limit);

        if (subleases.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(subleases);
    }
}
