package com.itdept.it.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    STUDENT,
    STAFF,
    ADMIN;

    @JsonCreator
    public static Role fromValue(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        String normalized = value.trim();
        if (normalized.equalsIgnoreCase("student")) {
            return STUDENT;
        }

        if (normalized.equalsIgnoreCase("faculty") || normalized.equalsIgnoreCase("staff")) {
            return STAFF;
        }

        if (normalized.equalsIgnoreCase("admin")) {
            return ADMIN;
        }

        return Role.valueOf(normalized.toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}
