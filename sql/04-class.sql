CREATE TABLE smart_watch_sales (
    sale_id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(100),
    city VARCHAR(50),
    units_sold INT,
    price_per_unit DECIMAL(10, 2),
    sale_date DATE
);

INSERT INTO smart_watch_sales
(brand, model, city, units_sold, price_per_unit, sale_date)
VALUES
('Apple', 'Apple Watch Series 9', 'Mumbai', 12, 41999.00, '2026-01-05'),

('Samsung', 'Galaxy Watch 6', 'Delhi', 18, 28999.00, '2026-01-07'),

('Noise', 'Noise ColorFit Pro 5', 'Bangalore', 25, 4999.00, '2026-01-10'),

('Boat', 'Wave Elevate', 'Pune', 30, 3499.00, '2026-01-12'),

('Fire-Boltt', 'Ninja Call Pro', 'Hyderabad', 22, 2199.00, '2026-01-15'),

('OnePlus', 'OnePlus Watch 2', 'Chennai', 10, 24999.00, '2026-01-18'),

('Fitbit', 'Versa 4', 'Kolkata', 8, 17999.00, '2026-01-20'),

('Garmin', 'Venu 3', 'Ahmedabad', 5, 45999.00, '2026-01-22'),

('Apple', 'Apple Watch Ultra 2', 'Delhi', 4, 89999.00, '2026-01-24'),

('Samsung', 'Galaxy Watch 5 Pro', 'Mumbai', 7, 35999.00, '2026-01-26'),

('Noise', 'NoiseFit Halo', 'Lucknow', 16, 6999.00, '2026-02-01'),

('Boat', 'Xtend Smartwatch', 'Jaipur', 20, 2999.00, '2026-02-03'),

('Fire-Boltt', 'Phoenix Ultra', 'Surat', 14, 2499.00, '2026-02-05'),

('Amazfit', 'GTR 4', 'Bhopal', 9, 16999.00, '2026-02-07'),

('Realme', 'TechLife Watch S100', 'Indore', 28, 1999.00, '2026-02-10'),

('Apple', 'Apple Watch SE', 'Chandigarh', 11, 29999.00, '2026-02-12'),

('Samsung', 'Galaxy Fit 3', 'Nagpur', 19, 8999.00, '2026-02-15'),

('Garmin', 'Forerunner 265', 'Bangalore', 6, 50999.00, '2026-02-18'),

('Fitbit', 'Sense 2', 'Pune', 7, 21999.00, '2026-02-20'),

('Noise', 'ColorFit Ultra 3', 'Hyderabad', 24, 7999.00, '2026-02-25');


-- Aggregation

SELECT COUNT(*) AS total_rows FROM smart_watch_sales;

SELECT SUM(units_sold) AS total_units_sold FROM smart_watch_sales;

SELECT model, units_sold * price_per_unit AS total_sale FROM smart_watch_sales;

SELECT AVG(price_per_unit) AS avg_price_per_unit FROM smart_watch_sales;

SELECT MIN(price_per_unit) AS cheapest FROM smart_watch_sales;

SELECT MAX(price_per_unit) AS costaliest FROM smart_watch_sales;

SELECT * FROM smart_watch_sales;


-- ! Group By

SELECT brand, SUM(units_sold) AS total_units_sold
FROM smart_watch_sales
GROUP BY brand
ORDER BY total_units_sold DESC;

SELECT brand, MIN(price_per_unit) AS price
FROM smart_watch_sales
GROUP BY brand;

SELECT 
    city, SUM(units_sold * price_per_unit) as city_revenue
FROM smart_watch_sales
GROUP BY city
ORDER BY city_revenue DESC;


SELECT city, brand, SUM(units_sold) AS units
FROM smart_watch_sales
GROUP BY city, brand;

-- ! Using HAVING keyword

-- Example 1: Cities with Total Sales More Than 20 Units
SELECT city, SUM(units_sold) AS total_units
FROM smart_watch_sales
GROUP BY city
HAVING SUM(units_sold) > 20;