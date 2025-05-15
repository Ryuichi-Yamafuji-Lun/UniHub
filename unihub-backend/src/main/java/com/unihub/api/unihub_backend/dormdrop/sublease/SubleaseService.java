package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.account.AccountRepository;
import com.unihub.api.unihub_backend.accountstatusrole.AccountStatus;
import com.unihub.api.unihub_backend.cardinalcart.listing.Listing;

import jakarta.transaction.Transactional;

@Service
public class SubleaseService {
    
    private final SubleaseRepository subleaseRepository;
    private final AccountRepository accountRepository;

    public SubleaseService(SubleaseRepository subleaseRepository, AccountRepository accountRepository) {
        this.subleaseRepository = subleaseRepository;
        this.accountRepository = accountRepository;
    }

    // check if account is active
    private void validateAccount(Account account) {
        if (!account.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalArgumentException("Account is invalid");
        }
    }
    
    // check if user is the owner of the listing
    public boolean isOwnerOfSublease(Sublease sublease, Account account) {
        return sublease.getAccount().equals(account);
    }

    // create sublease
    @Transactional
    public Sublease createSublease(Sublease sublease, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Create Sublease: account not found"));

        validateAccount(account);

        // do a double take on accound and date posted
        sublease.setAccount(account);
        sublease.setDatePosted(LocalDateTime.now());
        
        return subleaseRepository.save(sublease);
    }

    // delete sublease
    public void deleteSubLease(Long subleaseId, Long accountId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Delete Sublease: account not found"));

        if (!isOwnerOfSublease(sublease, account)) {
            throw new IllegalArgumentException("You are not authorized to delete this listing");
        }

        subleaseRepository.delete(sublease);
    }

    // update sublease
    @Transactional
    public Sublease updateSublease(Long subleaseId, Sublease updatedSublease, Long accountId) {
        Sublease sublease = subleaseRepository.findById(subleaseId).orElseThrow(() -> new IllegalArgumentException("Sublease not found"));

        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Delete Sublease: account not found"));

        if (!isOwnerOfSublease(sublease, account)) {
            throw new IllegalArgumentException("You are not authorized to update this sublease");
        }

        sublease.setLeaseName(updatedSublease.getLeaseName());
        sublease.setLeaseStartDate(updatedSublease.getLeaseStartDate());
        sublease.setLeaseEndDate(updatedSublease.getLeaseEndDate());
        sublease.setAmenities(updatedSublease.getAmenities());
        sublease.setLeasePrice(updatedSublease.getLeasePrice());
        sublease.setRoomType(updatedSublease.getRoomType());
        sublease.setLeaseImage(updatedSublease.getLeaseImage());
        sublease.setLeaseDescription(updatedSublease.getLeaseDescription());
        sublease.setLeaseAddress(updatedSublease.getLeaseAddress());
        sublease.setLongitude(updatedSublease.getLongitude());
        sublease.setLatitude(updatedSublease.getLatitude());
        sublease.setVersion(sublease.getVersion() + 1);
        sublease.setLeaseSchool(updatedSublease.getLeaseSchool());

        return subleaseRepository.save(sublease);
    }
    
}
