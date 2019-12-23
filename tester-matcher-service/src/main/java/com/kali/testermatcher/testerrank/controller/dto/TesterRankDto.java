package com.kali.testermatcher.testerrank.controller.dto;

import com.kali.testermatcher.testerrank.model.TesterRank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TesterRankDto {

    private Long testerId;
    private String firstName;
    private String lastName;
    private String country;
    private Integer bugsCount;

    public static TesterRankDto from(TesterRank testerRank) {
        return TesterRankDto.builder()
                .testerId(testerRank.getTester().getId())
                .firstName(testerRank.getTester().getFirstName())
                .lastName(testerRank.getTester().getLastName())
                .country(testerRank.getTester().getCountry())
                .bugsCount(testerRank.getScore())
                .build();
    }
}
