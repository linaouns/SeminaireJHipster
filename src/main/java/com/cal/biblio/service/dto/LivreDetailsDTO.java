package com.cal.biblio.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.cal.biblio.domain.LivreDetails} entity.
 */
public class LivreDetailsDTO implements Serializable {
    
    private Long id;

    private LocalDate dateCreation;

    private LocalDate derniereDateEdition;


    private Long livreId;

    private String livreNom;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDate getDerniereDateEdition() {
        return derniereDateEdition;
    }

    public void setDerniereDateEdition(LocalDate derniereDateEdition) {
        this.derniereDateEdition = derniereDateEdition;
    }

    public Long getLivreId() {
        return livreId;
    }

    public void setLivreId(Long livreId) {
        this.livreId = livreId;
    }

    public String getLivreNom() {
        return livreNom;
    }

    public void setLivreNom(String livreNom) {
        this.livreNom = livreNom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LivreDetailsDTO)) {
            return false;
        }

        return id != null && id.equals(((LivreDetailsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LivreDetailsDTO{" +
            "id=" + getId() +
            ", dateCreation='" + getDateCreation() + "'" +
            ", derniereDateEdition='" + getDerniereDateEdition() + "'" +
            ", livreId=" + getLivreId() +
            ", livreNom='" + getLivreNom() + "'" +
            "}";
    }
}
