package com.kali.testermatcher.common;

import com.fasterxml.jackson.databind.ObjectMapper;

public class TestUtil {

    private static ObjectMapper mapper = new ObjectMapper();

    public static <T> T readFile(String fileName, Class testClass, Class<T> clazz) {
        try {
            return mapper.readValue(testClass.getResource(fileName), clazz);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
