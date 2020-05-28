package com.cal.biblio.service.mapper;


import com.cal.biblio.domain.*;
import com.cal.biblio.service.dto.AuteurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Auteur} and its DTO {@link AuteurDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuteurMapper extends EntityMapper<AuteurDTO, Auteur> {


    @Mapping(target = "livres", ignore = true)
    @Mapping(target = "removeLivre", ignore = true)
    Auteur toEntity(AuteurDTO auteurDTO);

    default Auteur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Auteur auteur = new Auteur();
        auteur.setId(id);
        return auteur;
    }
}
