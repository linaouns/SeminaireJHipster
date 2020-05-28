package com.cal.biblio.web.rest;

import com.cal.biblio.CalBiblioApp;
import com.cal.biblio.domain.Livre;
import com.cal.biblio.repository.LivreRepository;
import com.cal.biblio.service.LivreService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LivreResource} REST controller.
 */
@SpringBootTest(classes = CalBiblioApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class LivreResourceIT {

    private static final String DEFAULT_I_SBN = "AAAAAAAAAA";
    private static final String UPDATED_I_SBN = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_MAISON_EDITION = "AAAAAAAAAA";
    private static final String UPDATED_MAISON_EDITION = "BBBBBBBBBB";

    @Autowired
    private LivreRepository livreRepository;

    @Mock
    private LivreRepository livreRepositoryMock;

    @Mock
    private LivreService livreServiceMock;

    @Autowired
    private LivreService livreService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLivreMockMvc;

    private Livre livre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Livre createEntity(EntityManager em) {
        Livre livre = new Livre()
            .iSBN(DEFAULT_I_SBN)
            .nom(DEFAULT_NOM)
            .maisonEdition(DEFAULT_MAISON_EDITION);
        return livre;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Livre createUpdatedEntity(EntityManager em) {
        Livre livre = new Livre()
            .iSBN(UPDATED_I_SBN)
            .nom(UPDATED_NOM)
            .maisonEdition(UPDATED_MAISON_EDITION);
        return livre;
    }

    @BeforeEach
    public void initTest() {
        livre = createEntity(em);
    }

    @Test
    @Transactional
    public void createLivre() throws Exception {
        int databaseSizeBeforeCreate = livreRepository.findAll().size();
        // Create the Livre
        restLivreMockMvc.perform(post("/api/livres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isCreated());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeCreate + 1);
        Livre testLivre = livreList.get(livreList.size() - 1);
        assertThat(testLivre.getiSBN()).isEqualTo(DEFAULT_I_SBN);
        assertThat(testLivre.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testLivre.getMaisonEdition()).isEqualTo(DEFAULT_MAISON_EDITION);
    }

    @Test
    @Transactional
    public void createLivreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = livreRepository.findAll().size();

        // Create the Livre with an existing ID
        livre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLivreMockMvc.perform(post("/api/livres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isBadRequest());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLivres() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        // Get all the livreList
        restLivreMockMvc.perform(get("/api/livres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(livre.getId().intValue())))
            .andExpect(jsonPath("$.[*].iSBN").value(hasItem(DEFAULT_I_SBN)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].maisonEdition").value(hasItem(DEFAULT_MAISON_EDITION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllLivresWithEagerRelationshipsIsEnabled() throws Exception {
        when(livreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restLivreMockMvc.perform(get("/api/livres?eagerload=true"))
            .andExpect(status().isOk());

        verify(livreServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllLivresWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(livreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restLivreMockMvc.perform(get("/api/livres?eagerload=true"))
            .andExpect(status().isOk());

        verify(livreServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getLivre() throws Exception {
        // Initialize the database
        livreRepository.saveAndFlush(livre);

        // Get the livre
        restLivreMockMvc.perform(get("/api/livres/{id}", livre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(livre.getId().intValue()))
            .andExpect(jsonPath("$.iSBN").value(DEFAULT_I_SBN))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.maisonEdition").value(DEFAULT_MAISON_EDITION));
    }
    @Test
    @Transactional
    public void getNonExistingLivre() throws Exception {
        // Get the livre
        restLivreMockMvc.perform(get("/api/livres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLivre() throws Exception {
        // Initialize the database
        livreService.save(livre);

        int databaseSizeBeforeUpdate = livreRepository.findAll().size();

        // Update the livre
        Livre updatedLivre = livreRepository.findById(livre.getId()).get();
        // Disconnect from session so that the updates on updatedLivre are not directly saved in db
        em.detach(updatedLivre);
        updatedLivre
            .iSBN(UPDATED_I_SBN)
            .nom(UPDATED_NOM)
            .maisonEdition(UPDATED_MAISON_EDITION);

        restLivreMockMvc.perform(put("/api/livres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLivre)))
            .andExpect(status().isOk());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeUpdate);
        Livre testLivre = livreList.get(livreList.size() - 1);
        assertThat(testLivre.getiSBN()).isEqualTo(UPDATED_I_SBN);
        assertThat(testLivre.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testLivre.getMaisonEdition()).isEqualTo(UPDATED_MAISON_EDITION);
    }

    @Test
    @Transactional
    public void updateNonExistingLivre() throws Exception {
        int databaseSizeBeforeUpdate = livreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLivreMockMvc.perform(put("/api/livres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(livre)))
            .andExpect(status().isBadRequest());

        // Validate the Livre in the database
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLivre() throws Exception {
        // Initialize the database
        livreService.save(livre);

        int databaseSizeBeforeDelete = livreRepository.findAll().size();

        // Delete the livre
        restLivreMockMvc.perform(delete("/api/livres/{id}", livre.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Livre> livreList = livreRepository.findAll();
        assertThat(livreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
