package com.cal.biblio.web.rest;

import com.cal.biblio.CalBiblioApp;
import com.cal.biblio.domain.LivreDetails;
import com.cal.biblio.domain.Livre;
import com.cal.biblio.repository.LivreDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LivreDetailsResource} REST controller.
 */
@SpringBootTest(classes = CalBiblioApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LivreDetailsResourceIT {

    private static final LocalDate DEFAULT_DATE_CREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DERNIERE_DATE_EDITION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DERNIERE_DATE_EDITION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LivreDetailsRepository livreDetailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLivreDetailsMockMvc;

    private LivreDetails livreDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LivreDetails createEntity(EntityManager em) {
        LivreDetails livreDetails = new LivreDetails()
            .dateCreation(DEFAULT_DATE_CREATION)
            .derniereDateEdition(DEFAULT_DERNIERE_DATE_EDITION);
        // Add required entity
        Livre livre;
        if (TestUtil.findAll(em, Livre.class).isEmpty()) {
            livre = LivreResourceIT.createEntity(em);
            em.persist(livre);
            em.flush();
        } else {
            livre = TestUtil.findAll(em, Livre.class).get(0);
        }
        livreDetails.setLivre(livre);
        return livreDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LivreDetails createUpdatedEntity(EntityManager em) {
        LivreDetails livreDetails = new LivreDetails()
            .dateCreation(UPDATED_DATE_CREATION)
            .derniereDateEdition(UPDATED_DERNIERE_DATE_EDITION);
        // Add required entity
        Livre livre;
        if (TestUtil.findAll(em, Livre.class).isEmpty()) {
            livre = LivreResourceIT.createUpdatedEntity(em);
            em.persist(livre);
            em.flush();
        } else {
            livre = TestUtil.findAll(em, Livre.class).get(0);
        }
        livreDetails.setLivre(livre);
        return livreDetails;
    }

    @BeforeEach
    public void initTest() {
        livreDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createLivreDetails() throws Exception {
        int databaseSizeBeforeCreate = livreDetailsRepository.findAll().size();
        // Create the LivreDetails
        restLivreDetailsMockMvc.perform(post("/api/livre-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livreDetails)))
            .andExpect(status().isCreated());

        // Validate the LivreDetails in the database
        List<LivreDetails> livreDetailsList = livreDetailsRepository.findAll();
        assertThat(livreDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        LivreDetails testLivreDetails = livreDetailsList.get(livreDetailsList.size() - 1);
        assertThat(testLivreDetails.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
        assertThat(testLivreDetails.getDerniereDateEdition()).isEqualTo(DEFAULT_DERNIERE_DATE_EDITION);
    }

    @Test
    @Transactional
    public void createLivreDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = livreDetailsRepository.findAll().size();

        // Create the LivreDetails with an existing ID
        livreDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLivreDetailsMockMvc.perform(post("/api/livre-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livreDetails)))
            .andExpect(status().isBadRequest());

        // Validate the LivreDetails in the database
        List<LivreDetails> livreDetailsList = livreDetailsRepository.findAll();
        assertThat(livreDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLivreDetails() throws Exception {
        // Initialize the database
        livreDetailsRepository.saveAndFlush(livreDetails);

        // Get all the livreDetailsList
        restLivreDetailsMockMvc.perform(get("/api/livre-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(livreDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(DEFAULT_DATE_CREATION.toString())))
            .andExpect(jsonPath("$.[*].derniereDateEdition").value(hasItem(DEFAULT_DERNIERE_DATE_EDITION.toString())));
    }
    
    @Test
    @Transactional
    public void getLivreDetails() throws Exception {
        // Initialize the database
        livreDetailsRepository.saveAndFlush(livreDetails);

        // Get the livreDetails
        restLivreDetailsMockMvc.perform(get("/api/livre-details/{id}", livreDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(livreDetails.getId().intValue()))
            .andExpect(jsonPath("$.dateCreation").value(DEFAULT_DATE_CREATION.toString()))
            .andExpect(jsonPath("$.derniereDateEdition").value(DEFAULT_DERNIERE_DATE_EDITION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLivreDetails() throws Exception {
        // Get the livreDetails
        restLivreDetailsMockMvc.perform(get("/api/livre-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLivreDetails() throws Exception {
        // Initialize the database
        livreDetailsRepository.saveAndFlush(livreDetails);

        int databaseSizeBeforeUpdate = livreDetailsRepository.findAll().size();

        // Update the livreDetails
        LivreDetails updatedLivreDetails = livreDetailsRepository.findById(livreDetails.getId()).get();
        // Disconnect from session so that the updates on updatedLivreDetails are not directly saved in db
        em.detach(updatedLivreDetails);
        updatedLivreDetails
            .dateCreation(UPDATED_DATE_CREATION)
            .derniereDateEdition(UPDATED_DERNIERE_DATE_EDITION);

        restLivreDetailsMockMvc.perform(put("/api/livre-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLivreDetails)))
            .andExpect(status().isOk());

        // Validate the LivreDetails in the database
        List<LivreDetails> livreDetailsList = livreDetailsRepository.findAll();
        assertThat(livreDetailsList).hasSize(databaseSizeBeforeUpdate);
        LivreDetails testLivreDetails = livreDetailsList.get(livreDetailsList.size() - 1);
        assertThat(testLivreDetails.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testLivreDetails.getDerniereDateEdition()).isEqualTo(UPDATED_DERNIERE_DATE_EDITION);
    }

    @Test
    @Transactional
    public void updateNonExistingLivreDetails() throws Exception {
        int databaseSizeBeforeUpdate = livreDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLivreDetailsMockMvc.perform(put("/api/livre-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livreDetails)))
            .andExpect(status().isBadRequest());

        // Validate the LivreDetails in the database
        List<LivreDetails> livreDetailsList = livreDetailsRepository.findAll();
        assertThat(livreDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLivreDetails() throws Exception {
        // Initialize the database
        livreDetailsRepository.saveAndFlush(livreDetails);

        int databaseSizeBeforeDelete = livreDetailsRepository.findAll().size();

        // Delete the livreDetails
        restLivreDetailsMockMvc.perform(delete("/api/livre-details/{id}", livreDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LivreDetails> livreDetailsList = livreDetailsRepository.findAll();
        assertThat(livreDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
