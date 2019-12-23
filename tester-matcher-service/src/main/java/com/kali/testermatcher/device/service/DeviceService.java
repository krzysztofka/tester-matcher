package com.kali.testermatcher.device.service;

import com.kali.testermatcher.device.model.DeviceEntity;
import com.kali.testermatcher.device.repository.DeviceRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class DeviceService {

    private static final Sort DEFAULT_SORT = Sort.by("description");

    private final DeviceRepository deviceRepository;

    @Transactional(readOnly = true)
    public List<DeviceEntity> getDevices() {
        return deviceRepository.findAll(DEFAULT_SORT);
    }
}
