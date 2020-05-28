package com.cal.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Livre.
 */
@Entity
@Table(name = "livre")
public class Livre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "i_sbn")
    private String iSBN;

    @Column(name = "nom")
    private String nom;

    @Column(name = "maison_edition")
    private String maisonEdition;

    @ManyToOne
    @JsonIgnoreProperties(value = "livres", allowSetters = true)
    private User empruntePar;

    @ManyToMany
    @JoinTable(name = "livre_auteur",
               joinColumns = @JoinColumn(name = "livre_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "auteur_id", referencedColumnName = "id"))
    private Set<Auteur> auteurs = new HashSet<>();

    @OneToOne(mappedBy = "livre")
    @JsonIgnore
    private LivreDetails details;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getiSBN() {
        return iSBN;
    }

    public Livre iSBN(String iSBN) {
        this.iSBN = iSBN;
        return this;
    }

    public void setiSBN(String iSBN) {
        this.iSBN = iSBN;
    }

    public String getNom() {
        return nom;
    }

    public Livre nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMaisonEdition() {
        return maisonEdition;
    }

    public Livre maisonEdition(String maisonEdition) {
        this.maisonEdition = maisonEdition;
        return this;
    }

    public void setMaisonEdition(String maisonEdition) {
        this.maisonEdition = maisonEdition;
    }

    public User getEmpruntePar() {
        return empruntePar;
    }

    public Livre empruntePar(User user) {
        this.empruntePar = user;
        return this;
    }

    public void setEmpruntePar(User user) {
        this.empruntePar = user;
    }

    public Set<Auteur> getAuteurs() {
        return auteurs;
    }

    public Livre auteurs(Set<Auteur> auteurs) {
        this.auteurs = auteurs;
        return this;
    }

    public Livre addAuteur(Auteur auteur) {
        this.auteurs.add(auteur);
        auteur.getLivres().add(this);
        return this;
    }

    public Livre removeAuteur(Auteur auteur) {
        this.auteurs.remove(auteur);
        auteur.getLivres().remove(this);
        return this;
    }

    public void setAuteurs(Set<Auteur> auteurs) {
        this.auteurs = auteurs;
    }

    public LivreDetails getDetails() {
        return details;
    }

    public Livre details(LivreDetails livreDetails) {
        this.details = livreDetails;
        return this;
    }

    public void setDetails(LivreDetails livreDetails) {
        this.details = livreDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Livre)) {
            return false;
        }
        return id != null && id.equals(((Livre) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Livre{" +
            "id=" + getId() +
            ", iSBN='" + getiSBN() + "'" +
            ", nom='" + getNom() + "'" +
            ", maisonEdition='" + getMaisonEdition() + "'" +
            "}";
    }
}
