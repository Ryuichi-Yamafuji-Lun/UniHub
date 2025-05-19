package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unihub.api.unihub_backend.common.enums.Schools;
import com.unihub.api.unihub_backend.account.Account;



public interface SubleaseRepository extends JpaRepository<Sublease, Long>{
    @Query("""
    SELECT s FROM Sublease s
    WHERE s.leasePrice <= :maxPrice
      AND s.latitude BETWEEN :latMin AND :latMax
      AND s.longitude BETWEEN :lngMin AND :lngMax
      AND (:leaseName IS NULL OR LOWER(s.leaseName) LIKE LOWER(CONCAT('%', :leaseName, '%')))
    """)

    List<Sublease> searchWithOptionalNameAndLocation(
        @Param("maxPrice") Double maxPrice,
        @Param("latMin") Double latMin,
        @Param("latMax") Double latMax,
        @Param("lngMin") Double lngMin,
        @Param("lngMax") Double lngMax,
        @Param("leaseName") String leaseName
    );

    List<Sublease> findByLeaseSchool(Schools leaseSchool);

    List<Sublease> findByLeaseName(String leaseName);

    List<Sublease> findByAccount(Account account);
    
    List<Sublease> findAllByOrderByDatePostedDesc();

    List<Sublease> findByAccountOrderByDatePostedDesc(Account account);
}
