package com.cal.biblio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cal.biblio.web.rest.TestUtil;

public class LivreDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LivreDetails.class);
        LivreDetails livreDetails1 = new LivreDetails();
        livreDetails1.setId(1L);
        LivreDetails livreDetails2 = new LivreDetails();
        livreDetails2.setId(livreDetails1.getId());
        assertThat(livreDetails1).isEqualTo(livreDetails2);
        livreDetails2.setId(2L);
        assertThat(livreDetails1).isNotEqualTo(livreDetails2);
        livreDetails1.setId(null);
        assertThat(livreDetails1).isNotEqualTo(livreDetails2);
    }
}
