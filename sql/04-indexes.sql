
CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    marks INT NOT NULL
);

-- Insert 1 million random data in marks
INSERT INTO marks (name, marks)
SELECT
    substr(
        translate(
            md5(random()::text || gs::text),
            'abcdefghijklmnopqrstuvwxyz',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        ),
        1,
        12
    ) AS name,
    floor(random() * 100 + 1)::int AS marks

FROM generate_series(1, 1000000) AS gs;

-- SELECT COUNT(*) FROM marks;
SELECT * FROM marks;

EXPLAIN ANALYZE SELECT * FROM marks WHERE name='A62AE5FFB0AF';

CREATE INDEX idx_name ON marks (name);
DROP INDEX idx_name;

-- non key value index (icluding column also in index)

CREATE INDEX idx_name ON marks (name) INCLUDE(marks);
--                      table name          column name

