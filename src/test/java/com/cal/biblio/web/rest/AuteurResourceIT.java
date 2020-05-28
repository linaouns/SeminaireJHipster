package com.cal.biblio.web.rest;

import com.cal.biblio.CalBiblioApp;
import com.cal.biblio.domain.Auteur;
import com.cal.biblio.repository.AuteurRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AuteurResource} REST controller.
 */
@SpringBootTest(classes = CalBiblioApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AuteurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private AuteurRepository auteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAuteurMockMvc;

    private Auteur auteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auteur createEntity(EntityManager em) {
        Auteur auteur = new Auteur()
            .nom(DEFAULT_NOM)
            .age(DEFAULT_AGE);
        return auteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auteur createUpdatedEntity(EntityManager em) {
        Auteur auteur = new Auteur()
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE);
        return auteur;
    }

    @BeforeEach
    public void initTest() {
        auteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuteur() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();
        // Create the Auteur
        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isCreated());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate + 1);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAuteur.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    @Transactional
    public void createAuteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auteurRepository.findAll().size();

        // Create the Auteur with an existing ID
        auteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuteurMockMvc.perform(post("/api/auteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAuteurs() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get all the auteurList
        restAuteurMockMvc.perform(get("/api/auteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }
    
    @Test
    @Transactional
    public void getAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", auteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(auteur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }
    @Test
    @Transactional
    public void getNonExistingAuteur() throws Exception {
        // Get the auteur
        restAuteurMockMvc.perform(get("/api/auteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // Update the auteur
        Auteur updatedAuteur = auteurRepository.findById(auteur.getId()).get();
        // Disconnect from session so that the updates on updatedAuteur are not directly saved in db
        em.detach(updatedAuteur);
        updatedAuteur
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE);

        restAuteurMockMvc.perform(put("/api/auteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuteur)))
            .andExpect(status().isOk());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate);
        Auteur testAuteur = auteurList.get(auteurList.size() - 1);
        assertThat(testAuteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAuteur.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    @Transactional
    public void updateNonExistingAuteur() throws Exception {
        int databaseSizeBeforeUpdate = auteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuteurMockMvc.perform(put("/api/auteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(auteur)))
            .andExpect(status().isBadRequest());

        // Validate the Auteur in the database
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuteur() throws Exception {
        // Initialize the database
        auteurRepository.saveAndFlush(auteur);

        int databaseSizeBeforeDelete = auteurRepository.findAll().size();

        // Delete the auteur
        restAuteurMockMvc.perform(delete("/api/auteurs/{id}", auteur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Auteur> auteurList = auteurRepository.findAll();
        assertThat(auteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
