package com.kali.testermatcherservice.device.service;

import com.kali.testermatcherservice.device.model.DeviceEntity;
import com.kali.testermatcherservice.device.repository.DeviceRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public List<DeviceEntity> getDevices() {
        return deviceRepository.findAll();
    }
}
