package com.kali.testermatcher.country;

import static io.restassured.RestAssured.when;
import static org.assertj.core.api.Assertions.assertThat;

import com.kali.testermatcher.AbstractIT;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class CountryControllerIT extends AbstractIT {

    @Test
    void shouldReturnAllSortedCountryCodes() {
        List<String> countryCodes = when()
                .get("/countries")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .jsonPath()
                .getList("", String.class);

        assertThat(countryCodes)
                .containsExactly("GB", "JP", "US");
    }
}
