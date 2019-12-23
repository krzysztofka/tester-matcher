package com.kali.testermatcher.common.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.StreamSupport;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.support.PageableExecutionUtils;

public class QueryDslSupport {

    public static <T> Page<T> fetchPage(JPAQuery<T> query, Pageable pageable,
            Map<String, Expression<? extends Comparable>> expressionBySortValue, EntityManager entityManager) {
        final JPAQuery<T> countQuery = query.clone(entityManager);
        final List<T> content = fetchPageContent(query, pageable, expressionBySortValue);
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private static <T> List<T> fetchPageContent(JPAQuery<T> query, Pageable pageable,
            Map<String, Expression<? extends Comparable>> expressionBySortValue) {
        return query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(toOrderSpecifiers(pageable, expressionBySortValue))
                .fetch();
    }

    private static OrderSpecifier[] toOrderSpecifiers(Pageable pageable,
            Map<String, Expression<? extends Comparable>> expressionBySortValue) {
        if (Objects.isNull(pageable.getSort())) {
            return new OrderSpecifier[]{};
        }
        return StreamSupport.stream(pageable.getSort()
                .spliterator(), false)
                .map(order -> toOrderSpecifier(order, expressionBySortValue))
                .toArray(OrderSpecifier[]::new);
    }

    private static OrderSpecifier<? extends Comparable> toOrderSpecifier(Sort.Order sortOrder,
            Map<String, Expression<? extends Comparable>> expressionBySortValue) {
        final Expression<? extends Comparable> sortExpression = expressionBySortValue.get(sortOrder.getProperty());
        final Order order = Order.valueOf(sortOrder.getDirection()
                .name());
        return new OrderSpecifier<>(order, sortExpression);
    }

}
