package com.kali.testermatcher.country.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "Country")
@Table(name = "countries")
public class CountryEntity {

    @Id
    private String countryCode;
}
