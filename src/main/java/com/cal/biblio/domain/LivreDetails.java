package com.cal.biblio.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A LivreDetails.
 */
@Entity
@Table(name = "livre_details")
public class LivreDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_creation")
    private LocalDate dateCreation;

    @Column(name = "derniere_date_edition")
    private LocalDate derniereDateEdition;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Livre livre;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public LivreDetails dateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDate getDerniereDateEdition() {
        return derniereDateEdition;
    }

    public LivreDetails derniereDateEdition(LocalDate derniereDateEdition) {
        this.derniereDateEdition = derniereDateEdition;
        return this;
    }

    public void setDerniereDateEdition(LocalDate derniereDateEdition) {
        this.derniereDateEdition = derniereDateEdition;
    }

    public Livre getLivre() {
        return livre;
    }

    public LivreDetails livre(Livre livre) {
        this.livre = livre;
        return this;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LivreDetails)) {
            return false;
        }
        return id != null && id.equals(((LivreDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LivreDetails{" +
            "id=" + getId() +
            ", dateCreation='" + getDateCreation() + "'" +
            ", derniereDateEdition='" + getDerniereDateEdition() + "'" +
            "}";
    }
}
