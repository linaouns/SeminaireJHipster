package com.cal.biblio.service.impl;

import com.cal.biblio.service.LivreService;
import com.cal.biblio.domain.Livre;
import com.cal.biblio.repository.LivreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Livre}.
 */
@Service
@Transactional
public class LivreServiceImpl implements LivreService {

    private final Logger log = LoggerFactory.getLogger(LivreServiceImpl.class);

    private final LivreRepository livreRepository;

    public LivreServiceImpl(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    /**
     * Save a livre.
     *
     * @param livre the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Livre save(Livre livre) {
        log.debug("Request to save Livre : {}", livre);
        return livreRepository.save(livre);
    }

    /**
     * Get all the livres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Livre> findAll(Pageable pageable) {
        log.debug("Request to get all Livres");
        return livreRepository.findAll(pageable);
    }


    /**
     * Get all the livres with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Livre> findAllWithEagerRelationships(Pageable pageable) {
        return livreRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     *  Get all the livres where Details is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Livre> findAllWhereDetailsIsNull() {
        log.debug("Request to get all livres where Details is null");
        return StreamSupport
            .stream(livreRepository.findAll().spliterator(), false)
            .filter(livre -> livre.getDetails() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one livre by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Livre> findOne(Long id) {
        log.debug("Request to get Livre : {}", id);
        return livreRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the livre by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Livre : {}", id);

        livreRepository.deleteById(id);
    }
}
