package com.kali.testermatcher.device;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

import com.kali.testermatcher.AbstractIT;
import com.kali.testermatcher.device.controller.dto.DeviceDto;
import io.restassured.http.ContentType;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class DeviceControllerIT extends AbstractIT {

    @Test
    void shouldReturnAllDevices() {
        List<DeviceDto> devices = given()
                .accept(ContentType.JSON)
                .when()
                .get("/devices")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .jsonPath()
                .getList("", DeviceDto.class);

        assertThat(devices).containsExactly(
                new DeviceDto(8, "Droid DNA"),
                new DeviceDto(7, "Droid Razor"),
                new DeviceDto(4, "Galaxy S3"),
                new DeviceDto(5, "Galaxy S4"),
                new DeviceDto(9, "HTC One"),
                new DeviceDto(6, "Nexus 4"),
                new DeviceDto(10, "iPhone 3"),
                new DeviceDto(1, "iPhone 4"),
                new DeviceDto(2, "iPhone 4S"),
                new DeviceDto(3, "iPhone 5")
        );
    }
}
