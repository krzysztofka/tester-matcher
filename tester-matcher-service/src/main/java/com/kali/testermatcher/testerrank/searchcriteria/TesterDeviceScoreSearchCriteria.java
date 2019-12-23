package com.kali.testermatcher.testerrank.searchcriteria;

import java.util.Set;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class TesterDeviceScoreSearchCriteria {

    private final Set<String> countryCodes;
    private final Set<Integer> deviceIds;
}
