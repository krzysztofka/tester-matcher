package com.kali.testermatcher.country.repository;

import com.kali.testermatcher.country.entity.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<CountryEntity, String> {

}
