package com.kali.testermatcher.testerrank.model;

import com.kali.testermatcher.device.model.DeviceEntity;
import com.kali.testermatcher.tester.model.TesterEntity;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "TesterDeviceScore")
@Table(name = "tester_device_scores")
public class TesterDeviceScoreEntity {

    @EmbeddedId
    private TesterDeviceScoreId id;

    @ManyToOne
    @JoinColumn(name = "device_id", insertable = false, updatable = false)
    private DeviceEntity device;

    @ManyToOne
    @JoinColumn(name = "tester_id", insertable = false, updatable = false)
    private TesterEntity tester;

    private Integer bugsCount;

    @Data
    @Embeddable
    public static class TesterDeviceScoreId implements Serializable {

        @Column(name = "tester_id")
        private Long testerId;

        @Column(name = "device_id")
        private Long deviceId;
    }
}
