package com.kali.testermatcherservice.bug.model;

import com.kali.testermatcherservice.device.model.DeviceEntity;
import com.kali.testermatcherservice.tester.model.TesterEntity;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity(name = "Bug")
@Table(name = "bugs")
public class BugEntity {

    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id")
    private DeviceEntity device;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tester_id")
    private TesterEntity tester;
}
