package com.kali.testermatcherservice.device.controller;

import com.kali.testermatcherservice.device.controller.dto.DeviceDto;
import com.kali.testermatcherservice.device.service.DeviceService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/devices")
public class DeviceController {

    public final DeviceService deviceService;

    @GetMapping
    public List<DeviceDto> getDevices() {
        return deviceService.getDevices()
                .stream()
                .map(DeviceDto::from)
                .collect(Collectors.toList());
    }
}
