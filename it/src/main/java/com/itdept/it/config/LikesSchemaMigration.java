package com.itdept.it.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.ConnectionCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.Statement;

@Component
public class LikesSchemaMigration {

    private final JdbcTemplate jdbcTemplate;

    public LikesSchemaMigration(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void ensureLikesCreatedAtColumn() {
        jdbcTemplate.execute((ConnectionCallback<Void>) connection -> {
            DatabaseMetaData metaData = connection.getMetaData();

            try (ResultSet columns = metaData.getColumns(null, null, "likes", "created_at")) {
                if (columns.next()) {
                    return null;
                }
            }

            try (Statement statement = connection.createStatement()) {
                statement.executeUpdate(
                        "ALTER TABLE likes ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP"
                );
            }

            return null;
        });
    }
}
