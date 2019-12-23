package com.kali.testermatcher.device.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "Device")
@Table(name = "devices")
public class DeviceEntity {

    @Id
    private Integer id;
    private String description;
}
