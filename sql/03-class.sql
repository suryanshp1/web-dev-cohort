CREATE TABLE canteen_menu (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    category VARCHAR(50),
    price INT,
    is_available BOOLEAN DEFAULT TRUE
);

-- INSERT data into canteen_menu table
INSERT INTO canteen_menu (item_name, category, price)
VALUES
('Masala Chai', 'Beverages', 10),
('Vada Pav', 'Snacks', 15),
('Samosa', 'Snacks', 12),
('Rajma Chawal', 'Meals', 60),
('Maggi', 'Snacks', 25),
('Ice Tea', 'Beverages', 40),
('Idli', 'Snacks', 50);

SELECT * FROM canteen_menu;

-- Mutation
UPDATE canteen_menu
SET price = 20
WHERE item_name = 'Vada Pav';

UPDATE canteen_menu
SET price = price - 5
WHERE category = 'Beverages';

UPDATE canteen_menu
SET is_available = FALSE, price = 35
WHERE item_name = 'Samosa';

DELETE FROM canteen_menu
WHERE item_name = 'Idli';

-- DML - Data Manipulation Language
-- Dry run WHERE using select * to check if the condition is good enough