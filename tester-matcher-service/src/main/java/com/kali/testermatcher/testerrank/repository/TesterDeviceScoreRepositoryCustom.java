package com.kali.testermatcher.testerrank.repository;

import com.kali.testermatcher.testerrank.model.TesterRank;
import com.kali.testermatcher.testerrank.searchcriteria.TesterDeviceScoreSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TesterDeviceScoreRepositoryCustom {

    Page<TesterRank> getTesterRanks(final TesterDeviceScoreSearchCriteria searchCriteria, Pageable pageable);
}
