package com.kali.testermatcher.testerrank.controller;

import com.kali.testermatcher.testerrank.controller.dto.TesterRankDto;
import com.kali.testermatcher.testerrank.searchcriteria.TesterDeviceScoreSearchCriteria;
import com.kali.testermatcher.testerrank.service.TesterRankService;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/tester-ranks")
public class TesterRankController {

    private final TesterRankService testerRankService;

    @GetMapping("/page")
    public Page<TesterRankDto> getTestersRank(
            @RequestParam(required = false) Set<String> countryCodes,
            @RequestParam(required = false) Set<Integer> deviceIds,
            @PageableDefault(sort = TesterRankSortKey.BUGS_COUNT, direction = Direction.DESC) Pageable pageable) {

        final TesterDeviceScoreSearchCriteria testerRankSearchCriteria = TesterDeviceScoreSearchCriteria.builder()
                .countryCodes(countryCodes)
                .deviceIds(deviceIds)
                .build();
        return testerRankService.getTesterRankPage(testerRankSearchCriteria, pageable)
                .map(TesterRankDto::from);
    }
}
