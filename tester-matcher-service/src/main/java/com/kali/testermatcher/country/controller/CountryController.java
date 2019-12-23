package com.kali.testermatcher.country.controller;

import com.kali.testermatcher.country.entity.CountryEntity;
import com.kali.testermatcher.country.service.CountryService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/countries")
public class CountryController {

    private final CountryService countryService;

    @GetMapping
    public List<String> getCountryCodes() {
        return countryService.getCountries()
                .stream()
                .map(CountryEntity::getCountryCode)
                .collect(Collectors.toList());
    }
}
