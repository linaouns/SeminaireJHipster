package com.cal.biblio.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cal.biblio.web.rest.TestUtil;

public class LivreDetailsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LivreDetailsDTO.class);
        LivreDetailsDTO livreDetailsDTO1 = new LivreDetailsDTO();
        livreDetailsDTO1.setId(1L);
        LivreDetailsDTO livreDetailsDTO2 = new LivreDetailsDTO();
        assertThat(livreDetailsDTO1).isNotEqualTo(livreDetailsDTO2);
        livreDetailsDTO2.setId(livreDetailsDTO1.getId());
        assertThat(livreDetailsDTO1).isEqualTo(livreDetailsDTO2);
        livreDetailsDTO2.setId(2L);
        assertThat(livreDetailsDTO1).isNotEqualTo(livreDetailsDTO2);
        livreDetailsDTO1.setId(null);
        assertThat(livreDetailsDTO1).isNotEqualTo(livreDetailsDTO2);
    }
}
