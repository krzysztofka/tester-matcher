package com.kali.testermatcher.testerrank;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;

import com.kali.testermatcher.AbstractIT;
import com.kali.testermatcher.testerrank.controller.dto.TesterRankDto;
import io.restassured.http.ContentType;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

public class TesterRankControllerIT extends AbstractIT {

    @Test
    public void shouldReturnTesterRanksPage() {
        List<TesterRankDto> testerRanks = given()
                .accept(ContentType.JSON)
                .queryParam("size", "3")
                .queryParam("page", "1")
                .when()
                .get("/tester-ranks/page")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat()
                .body("totalElements", equalTo(9))
                .body("totalPages", equalTo(3))
                .extract()
                .jsonPath()
                .getList("content", TesterRankDto.class);

        assertThat(testerRanks).containsExactly(
                new TesterRankDto(1L, "Miguel", "Bautista", "US", 114),
                new TesterRankDto(6L, "Stanley", "Chen", "GB", 110),
                new TesterRankDto(5L, "Mingquan", "Zheng", "JP", 109));
    }

    @Test
    public void shouldReturnTesterRanksWithAppliedFilters() {
        List<TesterRankDto> testerRanks = given()
                .accept(ContentType.JSON)
                .queryParam("deviceIds", "9", "10")
                .queryParam("countryCodes", "GB", "JP")
                .queryParam("page", "0")
                .when()
                .get("/tester-ranks/page")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat()
                .body("totalElements", equalTo(3))
                .body("totalPages", equalTo(1))
                .extract()
                .jsonPath()
                .getList("content", TesterRankDto.class);

        assertThat(testerRanks).containsExactly(
                new TesterRankDto(8L, "Sean", "Wellington", "JP", 35),
                new TesterRankDto(9L, "Darshini", "Thiagarajan", "GB", 30),
                new TesterRankDto(5L, "Mingquan", "Zheng", "JP", 19));
    }

    @Test
    public void shouldReturnZeroBugsWhenTesterHasZeroForGivenDevice() {
        List<TesterRankDto> testerRanks = given()
                .accept(ContentType.JSON)
                .queryParam("countryCodes", "US")
                .queryParam("deviceIds", "4")
                .queryParam("sort", "bugsCount,asc")
                .queryParam("size", "1")
                .when()
                .get("/tester-ranks/page")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .jsonPath()
                .getList("content", TesterRankDto.class);

        assertThat(testerRanks).containsExactly(
                new TesterRankDto(1L, "Miguel", "Bautista", "US", 0));
    }
}
