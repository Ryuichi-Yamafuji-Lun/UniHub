package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unihub.api.unihub_backend.account.Account;
import com.unihub.api.unihub_backend.common.enums.Schools;

public interface SubleaseRepository extends JpaRepository<Sublease, Long>{
    @Query("""
    SELECT s FROM Sublease s
    WHERE s.leasePrice <= :maxPrice
      AND s.latitude BETWEEN :latMin AND :latMax
      AND s.longitude BETWEEN :lngMin AND :lngMax
      AND s.roomWidth BETWEEN :widthMin AND :widthMax
      AND s.roomDepth BETWEEN :depthMin AND :depthMax
      AND (:leaseName IS NULL OR LOWER(s.leaseName) LIKE LOWER(CONCAT('%', :leaseName, '%')))
    """)

    List<Sublease> searchWithOptionalNameAndLocation(
        @Param("maxPrice") Double maxPrice,
        @Param("latMin") Double latMin,
        @Param("latMax") Double latMax,
        @Param("lngMin") Double lngMin,
        @Param("lngMax") Double lngMax,
        @Param("widthMin") Double widthMin,
        @Param("widthMax") Double widthMax,
        @Param("depthMin") Double depthMin,
        @Param("depthMax") Double depthMax,
        @Param("leaseName") String leaseName
    );

    List<Sublease> findByLeaseSchool(Schools leaseSchool);

    List<Sublease> findByLeaseName(String leaseName);

    List<Sublease> findByAccount(Account account);
    
    List<Sublease> findAllByOrderByDatePostedDesc();

    List<Sublease> findByAccountOrderByDatePostedDesc(Account account);

    Page<Sublease> findAllByOrderByDatePostedDesc(Pageable pageable);
    
    default List<Sublease> findTop7ByOrderByDatePostedDesc() {
        return findAllByOrderByDatePostedDesc(PageRequest.of(0, 7)).getContent();
    }
}
