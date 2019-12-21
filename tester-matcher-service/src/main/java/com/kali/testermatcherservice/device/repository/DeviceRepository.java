package com.kali.testermatcherservice.device.repository;

import com.kali.testermatcherservice.device.model.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<DeviceEntity, Long> {

}
