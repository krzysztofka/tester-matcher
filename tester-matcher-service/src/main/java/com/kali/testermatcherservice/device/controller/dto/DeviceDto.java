package com.kali.testermatcherservice.device.controller.dto;

import com.kali.testermatcherservice.device.model.DeviceEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceDto {

    private Integer id;
    private String description;

    public static DeviceDto from(DeviceEntity deviceEntity) {
        return new DeviceDto(deviceEntity.getId(), deviceEntity.getDescription());
    }
}
