package com.cal.biblio.web.rest;

import com.cal.biblio.domain.LivreDetails;
import com.cal.biblio.repository.LivreDetailsRepository;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cal.biblio.domain.LivreDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LivreDetailsResource {

    private final Logger log = LoggerFactory.getLogger(LivreDetailsResource.class);

    private static final String ENTITY_NAME = "livreDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LivreDetailsRepository livreDetailsRepository;

    public LivreDetailsResource(LivreDetailsRepository livreDetailsRepository) {
        this.livreDetailsRepository = livreDetailsRepository;
    }

    /**
     * {@code POST  /livre-details} : Create a new livreDetails.
     *
     * @param livreDetails the livreDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new livreDetails, or with status {@code 400 (Bad Request)} if the livreDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/livre-details")
    public ResponseEntity<LivreDetails> createLivreDetails(@Valid @RequestBody LivreDetails livreDetails) throws URISyntaxException {
        log.debug("REST request to save LivreDetails : {}", livreDetails);
        if (livreDetails.getId() != null) {
            throw new BadRequestAlertException("A new livreDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LivreDetails result = livreDetailsRepository.save(livreDetails);
        return ResponseEntity.created(new URI("/api/livre-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /livre-details} : Updates an existing livreDetails.
     *
     * @param livreDetails the livreDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated livreDetails,
     * or with status {@code 400 (Bad Request)} if the livreDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the livreDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/livre-details")
    public ResponseEntity<LivreDetails> updateLivreDetails(@Valid @RequestBody LivreDetails livreDetails) throws URISyntaxException {
        log.debug("REST request to update LivreDetails : {}", livreDetails);
        if (livreDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LivreDetails result = livreDetailsRepository.save(livreDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, livreDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /livre-details} : get all the livreDetails.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of livreDetails in body.
     */
    @GetMapping("/livre-details")
    public ResponseEntity<List<LivreDetails>> getAllLivreDetails(Pageable pageable) {
        log.debug("REST request to get a page of LivreDetails");
        Page<LivreDetails> page = livreDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /livre-details/:id} : get the "id" livreDetails.
     *
     * @param id the id of the livreDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the livreDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/livre-details/{id}")
    public ResponseEntity<LivreDetails> getLivreDetails(@PathVariable Long id) {
        log.debug("REST request to get LivreDetails : {}", id);
        Optional<LivreDetails> livreDetails = livreDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(livreDetails);
    }

    /**
     * {@code DELETE  /livre-details/:id} : delete the "id" livreDetails.
     *
     * @param id the id of the livreDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/livre-details/{id}")
    public ResponseEntity<Void> deleteLivreDetails(@PathVariable Long id) {
        log.debug("REST request to delete LivreDetails : {}", id);

        livreDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
