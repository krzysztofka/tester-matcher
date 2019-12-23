package com.kali.testermatcher.testerrank.repository;

import com.kali.testermatcher.testerrank.model.TesterDeviceScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TesterDeviceScoreRepository extends JpaRepository<TesterDeviceScoreEntity, Long>,
        TesterDeviceScoreRepositoryCustom {

}
