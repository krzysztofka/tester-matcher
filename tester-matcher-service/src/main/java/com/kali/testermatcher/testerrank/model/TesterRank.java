package com.kali.testermatcher.testerrank.model;

import com.kali.testermatcher.tester.model.TesterEntity;
import lombok.Value;

@Value
public class TesterRank {

    private TesterEntity tester;
    private Integer score;
}
