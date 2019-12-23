package com.kali.testermatcher.testerrank.service;

import com.kali.testermatcher.testerrank.model.TesterRank;
import com.kali.testermatcher.testerrank.repository.TesterDeviceScoreRepository;
import com.kali.testermatcher.testerrank.searchcriteria.TesterDeviceScoreSearchCriteria;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class TesterRankService {

    private final TesterDeviceScoreRepository testerRepository;

    @Transactional(readOnly = true)
    public Page<TesterRank> getTesterRankPage(TesterDeviceScoreSearchCriteria searchCriteria, Pageable pageable) {
        return testerRepository.getTesterRanks(searchCriteria, pageable);
    }
}
