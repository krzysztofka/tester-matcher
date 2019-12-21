package com.kali.testermatcherservice.device.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity(name = "Device")
@Table(name = "devices")
public class DeviceEntity {

    @Id
    private Integer id;
    private String description;
}
