package com.kali.testermatcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport
public class TesterMatcherServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TesterMatcherServiceApplication.class, args);
    }

}
