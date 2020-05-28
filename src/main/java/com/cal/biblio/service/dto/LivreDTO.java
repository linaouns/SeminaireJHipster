package com.cal.biblio.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DTO for the {@link com.cal.biblio.domain.Livre} entity.
 */
public class LivreDTO implements Serializable {
    
    private Long id;

    private String iSBN;

    private String nom;

    private String maisonEdition;

    private Set<UserDTO> users = new HashSet<>();

    private Long auteurId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getiSBN() {
        return iSBN;
    }

    public void setiSBN(String iSBN) {
        this.iSBN = iSBN;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMaisonEdition() {
        return maisonEdition;
    }

    public void setMaisonEdition(String maisonEdition) {
        this.maisonEdition = maisonEdition;
    }

    public Set<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(Set<UserDTO> users) {
        this.users = users;
    }

    public Long getAuteurId() {
        return auteurId;
    }

    public void setAuteurId(Long auteurId) {
        this.auteurId = auteurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LivreDTO)) {
            return false;
        }

        return id != null && id.equals(((LivreDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LivreDTO{" +
            "id=" + getId() +
            ", iSBN='" + getiSBN() + "'" +
            ", nom='" + getNom() + "'" +
            ", maisonEdition='" + getMaisonEdition() + "'" +
            ", users='" + getUsers() + "'" +
            ", auteurId=" + getAuteurId() +
            "}";
    }
}
