package com.cal.biblio.web.rest;

import com.cal.biblio.domain.Livre;
import com.cal.biblio.service.LivreService;
import com.cal.biblio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.cal.biblio.domain.Livre}.
 */
@RestController
@RequestMapping("/api")
public class LivreResource {

    private final Logger log = LoggerFactory.getLogger(LivreResource.class);

    private static final String ENTITY_NAME = "livre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LivreService livreService;

    public LivreResource(LivreService livreService) {
        this.livreService = livreService;
    }

    /**
     * {@code POST  /livres} : Create a new livre.
     *
     * @param livre the livre to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new livre, or with status {@code 400 (Bad Request)} if the livre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/livres")
    public ResponseEntity<Livre> createLivre(@RequestBody Livre livre) throws URISyntaxException {
        log.debug("REST request to save Livre : {}", livre);
        if (livre.getId() != null) {
            throw new BadRequestAlertException("A new livre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Livre result = livreService.save(livre);
        return ResponseEntity.created(new URI("/api/livres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /livres} : Updates an existing livre.
     *
     * @param livre the livre to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated livre,
     * or with status {@code 400 (Bad Request)} if the livre is not valid,
     * or with status {@code 500 (Internal Server Error)} if the livre couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/livres")
    public ResponseEntity<Livre> updateLivre(@RequestBody Livre livre) throws URISyntaxException {
        log.debug("REST request to update Livre : {}", livre);
        if (livre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Livre result = livreService.save(livre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, livre.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /livres} : get all the livres.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of livres in body.
     */
    @GetMapping("/livres")
    public ResponseEntity<List<Livre>> getAllLivres(Pageable pageable, @RequestParam(required = false) String filter, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("details-is-null".equals(filter)) {
            log.debug("REST request to get all Livres where details is null");
            return new ResponseEntity<>(livreService.findAllWhereDetailsIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Livres");
        Page<Livre> page;
        if (eagerload) {
            page = livreService.findAllWithEagerRelationships(pageable);
        } else {
            page = livreService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /livres/:id} : get the "id" livre.
     *
     * @param id the id of the livre to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the livre, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/livres/{id}")
    public ResponseEntity<Livre> getLivre(@PathVariable Long id) {
        log.debug("REST request to get Livre : {}", id);
        Optional<Livre> livre = livreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(livre);
    }

    /**
     * {@code DELETE  /livres/:id} : delete the "id" livre.
     *
     * @param id the id of the livre to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/livres/{id}")
    public ResponseEntity<Void> deleteLivre(@PathVariable Long id) {
        log.debug("REST request to delete Livre : {}", id);

        livreService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
