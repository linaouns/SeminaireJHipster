package com.cal.biblio.service;

import com.cal.biblio.domain.Livre;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Livre}.
 */
public interface LivreService {

    /**
     * Save a livre.
     *
     * @param livre the entity to save.
     * @return the persisted entity.
     */
    Livre save(Livre livre);

    /**
     * Get all the livres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Livre> findAll(Pageable pageable);
    /**
     * Get all the LivreDTO where Details is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Livre> findAllWhereDetailsIsNull();

    /**
     * Get all the livres with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Livre> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" livre.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Livre> findOne(Long id);

    /**
     * Delete the "id" livre.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
