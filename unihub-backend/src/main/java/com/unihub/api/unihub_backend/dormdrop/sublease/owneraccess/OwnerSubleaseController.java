package com.unihub.api.unihub_backend.dormdrop.sublease.owneraccess;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.dormdrop.sublease.Sublease;
import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseService;

@RestController
@RequestMapping(path = "api/v1/owner/sublease")
public class OwnerSubleaseController {
    
    private final SubleaseService subleaseService;

    public OwnerSubleaseController(SubleaseService subleaseService) {
        this.subleaseService = subleaseService;
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<Sublease> createSublease(@RequestBody Sublease newSublease, @PathVariable Long accountId) {
        Sublease createSublease = subleaseService.createSublease(newSublease, accountId);
        return ResponseEntity.status(201).body(createSublease);
    }

    @DeleteMapping("/{accountId}/{subleaseId}")
    public ResponseEntity<Void> deleteSublease(@PathVariable Long accountId, @PathVariable Long subleaseId) {
        try {
            subleaseService.deleteSubLease(subleaseId, accountId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{accountId}/{subleaseId}")
    public ResponseEntity<Sublease> updateSublease(@PathVariable Long accountId, @PathVariable Long subleaseId, @RequestBody Sublease updatedSublease) {
        try {
            Sublease updated = subleaseService.updateSublease(subleaseId, updatedSublease, accountId);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
