package com.cal.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Auteur.
 */
@Entity
@Table(name = "auteur")
public class Auteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "age")
    private Integer age;

    @ManyToMany(mappedBy = "auteurs")
    @JsonIgnore
    private Set<Livre> livres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Auteur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getAge() {
        return age;
    }

    public Auteur age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public Auteur livres(Set<Livre> livres) {
        this.livres = livres;
        return this;
    }

    public Auteur addLivre(Livre livre) {
        this.livres.add(livre);
        livre.getAuteurs().add(this);
        return this;
    }

    public Auteur removeLivre(Livre livre) {
        this.livres.remove(livre);
        livre.getAuteurs().remove(this);
        return this;
    }

    public void setLivres(Set<Livre> livres) {
        this.livres = livres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Auteur)) {
            return false;
        }
        return id != null && id.equals(((Auteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Auteur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", age=" + getAge() +
            "}";
    }
}
