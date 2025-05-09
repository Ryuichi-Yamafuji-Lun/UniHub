package com.unihub.api.unihub_backend.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long>{

    Optional<Account> findBySchoolEmail(String schoolEmail);
    
}
