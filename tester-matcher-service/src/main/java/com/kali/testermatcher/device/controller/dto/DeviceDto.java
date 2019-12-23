package com.kali.testermatcher.device.controller.dto;

import com.kali.testermatcher.device.model.DeviceEntity;
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
