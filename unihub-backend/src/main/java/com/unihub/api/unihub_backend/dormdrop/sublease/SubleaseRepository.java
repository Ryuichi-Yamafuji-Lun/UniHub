package com.unihub.api.unihub_backend.dormdrop.sublease;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unihub.api.unihub_backend.common.enums.Schools;


public interface SubleaseRepository extends JpaRepository<Sublease, Long>{
    List<Sublease> findByLeaseSchool(Schools leaseSchool);

    List<Sublease> findByLeasePriceLessThanEqual(Double maxPrice);

    List<Sublease> findByLatitudeBetweenAndLongitudeBetween(Double latMin, Double latMax, Double lngMin, Double lngMax);

}
