package com.cal.biblio.service;

import com.cal.biblio.domain.Auteur;
import com.cal.biblio.repository.AuteurRepository;
import com.cal.biblio.service.dto.AuteurDTO;
import com.cal.biblio.service.mapper.AuteurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Auteur}.
 */
@Service
@Transactional
public class AuteurService {

    private final Logger log = LoggerFactory.getLogger(AuteurService.class);

    private final AuteurRepository auteurRepository;

    private final AuteurMapper auteurMapper;

    public AuteurService(AuteurRepository auteurRepository, AuteurMapper auteurMapper) {
        this.auteurRepository = auteurRepository;
        this.auteurMapper = auteurMapper;
    }

    /**
     * Save a auteur.
     *
     * @param auteurDTO the entity to save.
     * @return the persisted entity.
     */
    public AuteurDTO save(AuteurDTO auteurDTO) {
        log.debug("Request to save Auteur : {}", auteurDTO);
        Auteur auteur = auteurMapper.toEntity(auteurDTO);
        auteur = auteurRepository.save(auteur);
        return auteurMapper.toDto(auteur);
    }

    /**
     * Get all the auteurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AuteurDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Auteurs");
        return auteurRepository.findAll(pageable)
            .map(auteurMapper::toDto);
    }


    /**
     * Get one auteur by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AuteurDTO> findOne(Long id) {
        log.debug("Request to get Auteur : {}", id);
        return auteurRepository.findById(id)
            .map(auteurMapper::toDto);
    }

    /**
     * Delete the auteur by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Auteur : {}", id);

        auteurRepository.deleteById(id);
    }
}
