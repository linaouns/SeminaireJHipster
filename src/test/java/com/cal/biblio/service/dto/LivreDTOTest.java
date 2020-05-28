package com.cal.biblio.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cal.biblio.web.rest.TestUtil;

public class LivreDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LivreDTO.class);
        LivreDTO livreDTO1 = new LivreDTO();
        livreDTO1.setId(1L);
        LivreDTO livreDTO2 = new LivreDTO();
        assertThat(livreDTO1).isNotEqualTo(livreDTO2);
        livreDTO2.setId(livreDTO1.getId());
        assertThat(livreDTO1).isEqualTo(livreDTO2);
        livreDTO2.setId(2L);
        assertThat(livreDTO1).isNotEqualTo(livreDTO2);
        livreDTO1.setId(null);
        assertThat(livreDTO1).isNotEqualTo(livreDTO2);
    }
}
