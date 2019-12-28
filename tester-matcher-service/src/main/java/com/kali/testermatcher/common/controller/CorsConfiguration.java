package com.kali.testermatcher.common.controller;

import com.google.common.collect.ImmutableList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class CorsConfiguration {

    private static final List<String> WILDCARD_RESOURCES =
            ImmutableList.of("/countries", "/devices", "/tester-ranks/*");

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                WILDCARD_RESOURCES.forEach(path -> registry.addMapping(path).allowedOrigins("*"));
            }
        };
    }

}
