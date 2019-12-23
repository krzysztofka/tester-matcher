package com.kali.testermatcher.testerrank.repository;

import static com.kali.testermatcher.common.repository.QueryDslSupport.fetchPage;
import static com.kali.testermatcher.testerrank.model.QTesterDeviceScoreEntity.testerDeviceScoreEntity;

import com.google.common.collect.ImmutableMap;
import com.kali.testermatcher.testerrank.controller.TesterRankSortKey;
import com.kali.testermatcher.testerrank.model.TesterRank;
import com.kali.testermatcher.testerrank.searchcriteria.TesterDeviceScoreSearchCriteria;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import java.util.Map;
import javax.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@AllArgsConstructor
public class TesterDeviceScoreRepositoryImpl implements TesterDeviceScoreRepositoryCustom {

    private final Map<String, Expression<? extends Comparable>> EXPRESSION_BY_SORT_VALUE = ImmutableMap.of(
            TesterRankSortKey.BUGS_COUNT, testerDeviceScoreEntity.bugsCount.sum());

    private final EntityManager entityManager;

    public Page<TesterRank> getTesterRanks(final TesterDeviceScoreSearchCriteria searchCriteria,
            final Pageable pageable) {
        final Predicate predicate = new TesterDeviceScorePredicateBuilder()
                .withSearchCriteria(searchCriteria)
                .build();

        final JPAQuery<TesterRank> baseQuery = new JPAQuery<>(entityManager)
                .select(Projections.constructor(
                        TesterRank.class,
                        testerDeviceScoreEntity.tester,
                        testerDeviceScoreEntity.bugsCount.sum()))
                .from(testerDeviceScoreEntity)
                .join(testerDeviceScoreEntity.device)
                .join(testerDeviceScoreEntity.tester)
                .where(predicate)
                .groupBy(testerDeviceScoreEntity.tester);

        return fetchPage(baseQuery, pageable, EXPRESSION_BY_SORT_VALUE, entityManager);
    }
}
