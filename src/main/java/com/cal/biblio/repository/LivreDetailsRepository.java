package com.cal.biblio.repository;

import com.cal.biblio.domain.LivreDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the LivreDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LivreDetailsRepository extends JpaRepository<LivreDetails, Long> {
}
