package com.kali.testermatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AbstractIT {

    @LocalServerPort
    private Integer applicationPort;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        RestAssured.port = applicationPort;
        RestAssured.baseURI = "http://localhost:" + applicationPort;
        RestAssured.config = RestAssuredConfig.config()
                .objectMapperConfig(
                        new ObjectMapperConfig().jackson2ObjectMapperFactory(
                                (c, s) -> objectMapper
                        ));
    }
}
