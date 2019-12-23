package com.kali.testermatcher.testerrank.repository;

import static com.kali.testermatcher.testerrank.model.QTesterDeviceScoreEntity.testerDeviceScoreEntity;

import com.kali.testermatcher.testerrank.searchcriteria.TesterDeviceScoreSearchCriteria;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.apache.commons.collections.CollectionUtils;

public class TesterDeviceScorePredicateBuilder {

    private List<BooleanExpression> expressions = new ArrayList<>();

    public TesterDeviceScorePredicateBuilder withSearchCriteria(TesterDeviceScoreSearchCriteria searchCriteria) {
        if (CollectionUtils.isNotEmpty(searchCriteria.getCountryCodes())) {
            withCountryCodeIn(searchCriteria.getCountryCodes());
        }
        if (CollectionUtils.isNotEmpty(searchCriteria.getDeviceIds())) {
            withDeviceIdIn(searchCriteria.getDeviceIds());
        }
        return this;
    }

    private void withCountryCodeIn(Set<String> countryCodes) {
        expressions.add(testerDeviceScoreEntity.tester.country.in(countryCodes));
    }

    private void withDeviceIdIn(Set<Integer> deviceIds) {
        expressions.add(testerDeviceScoreEntity.device.id.in(deviceIds));
    }

    public Predicate build() {
        return expressions.stream()
                .reduce(BooleanExpression::and)
                .orElse(Expressions.TRUE.isTrue());
    }
}
