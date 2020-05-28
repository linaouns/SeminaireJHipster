package com.cal.biblio.repository;

import com.cal.biblio.domain.Livre;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Livre entity.
 */
@Repository
public interface LivreRepository extends JpaRepository<Livre, Long> {

    @Query("select livre from Livre livre where livre.empruntePar.login = ?#{principal.username}")
    List<Livre> findByEmprunteParIsCurrentUser();

    @Query(value = "select distinct livre from Livre livre left join fetch livre.auteurs",
        countQuery = "select count(distinct livre) from Livre livre")
    Page<Livre> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct livre from Livre livre left join fetch livre.auteurs")
    List<Livre> findAllWithEagerRelationships();

    @Query("select livre from Livre livre left join fetch livre.auteurs where livre.id =:id")
    Optional<Livre> findOneWithEagerRelationships(@Param("id") Long id);
}
