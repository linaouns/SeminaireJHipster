package com.cal.biblio.repository;

import com.cal.biblio.domain.Auteur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Auteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuteurRepository extends JpaRepository<Auteur, Long> {
}
