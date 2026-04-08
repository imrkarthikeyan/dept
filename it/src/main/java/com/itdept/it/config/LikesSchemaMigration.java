package com.itdept.it.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class LikesSchemaMigration {

    private final JdbcTemplate jdbcTemplate;

    public LikesSchemaMigration(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void ensureLikesCreatedAtColumn() {
        Integer columnCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.COLUMNS "
                + "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'likes' AND COLUMN_NAME = 'created_at'",
                Integer.class
        );

        if (columnCount == null || columnCount == 0) {
            jdbcTemplate.execute("ALTER TABLE likes ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP");
        }
    }
}
