package com.kali.testermatcher.country.service;

import com.kali.testermatcher.country.entity.CountryEntity;
import com.kali.testermatcher.country.repository.CountryRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class CountryService {

    private static final Sort DEFAULT_SORT = Sort.by("countryCode");

    private final CountryRepository countryRepository;

    @Transactional(readOnly = true)
    public List<CountryEntity> getCountries() {
        return countryRepository.findAll(DEFAULT_SORT);
    }
}
