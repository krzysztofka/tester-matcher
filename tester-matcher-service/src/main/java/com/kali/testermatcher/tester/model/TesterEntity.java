package com.kali.testermatcher.tester.model;

import com.kali.testermatcher.bug.model.BugEntity;
import com.kali.testermatcher.device.model.DeviceEntity;
import java.time.Instant;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "Tester")
@Table(name = "testers")
public class TesterEntity {

    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String country;
    private Instant lastLogin;

    @ManyToMany
    @JoinTable(
            name = "tester_devices",
            joinColumns = @JoinColumn(name = "tester_id"),
            inverseJoinColumns = @JoinColumn(name = "device_id"))
    private Set<DeviceEntity> devices;

    @OneToMany(mappedBy = "tester")
    private Set<BugEntity> bugs;
}
