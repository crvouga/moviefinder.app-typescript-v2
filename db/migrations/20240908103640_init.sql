-- migrate:up

CREATE TABLE IF NOT EXISTS key_value (
    key TEXT PRIMARY KEY,
    value TEXT
);


-- migrate:down

DROP TABLE IF EXISTS key_value;
