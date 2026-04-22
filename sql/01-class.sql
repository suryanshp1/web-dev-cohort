-- docker exec -it 0f0a250445bc psql -U postgres
-- postgres=# \l
-- postgres=# CREATE DATABASE sql_class_1_db;
-- use sqltools extestion in vscode
-- You can also install postgress and access it using pgadmin

-- CREATE TABLE students (
--     student_id SERIAL PRIMARY KEY, -- serial: auto incremental integer, Primary key : Unique + never be null
--     first_name VARCHAR(50) NOT NULL, -- my first name should have max 50 letters
--     last_name VARCHAR(50),
--     email VARCHAR(322) UNIQUE NOT NULL,
--     phone_number CHAR(10) UNIQUE,
--     country_code VARCHAR(4),
--     age INT CHECK (age > 5),
--     current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active', 'graduated', 'dropped_out')),
--     masterji_handle VARCHAR(50) UNIQUE, -- masterji username
--     has_joined_masterji BOOLEAN DEFAULT FALSE,
--     current_score INT DEFAULT 0 CHECK (current_score >= 0 AND current_score <= 100),
--     enrollment_data DATE DEFAULT CURRENT_DATE -- This is UTC | DATE, DATETIME, TIMESTAMP
-- )

-- ALTER TABLE students
-- ADD COLUMN batch_name VARCHAR(50) DEFAULT 'web dev 2026';

-- DDl: Data Definition Language
