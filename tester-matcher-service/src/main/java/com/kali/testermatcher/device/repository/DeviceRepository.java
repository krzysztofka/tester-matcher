package com.kali.testermatcher.device.repository;

import com.kali.testermatcher.device.model.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<DeviceEntity, Integer> {

}
