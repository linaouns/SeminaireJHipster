package com.cal.biblio.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.cal.biblio.domain.Auteur} entity.
 */
public class AuteurDTO implements Serializable {
    
    private Long id;

    private String nom;

    private Integer age;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuteurDTO)) {
            return false;
        }

        return id != null && id.equals(((AuteurDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuteurDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", age=" + getAge() +
            "}";
    }
}
