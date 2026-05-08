CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team VARCHAR(50),
    role VARCHAR(50),
    run_scored INT CHECK (run_scored > 0),
    wickets_taken INT CHECK (wickets_taken > 0),
    auction_price_crores INT
);

ALTER TABLE ipl_players
ADD COLUMN nickname VARCHAR(50);

INSERT INTO ipl_players (name, team, role, run_scored, wickets_taken, auction_price_crores, nickname) VALUES
('Virat Kohli', 'RCB', 'Batter', 741, 1, 15, 'King Kohli'),
('Rohit Sharma', 'MI', 'Batter', 523, 2, 16, 'Hitman'),
('Jasprit Bumrah', 'MI', 'Bowler', 25, 20, 12, 'Boom Boom'),
('Ravindra Jadeja', 'CSK', 'All-rounder', 250, 15, 9, 'Sir Jadeja'),
('Hardik Pandya', 'GT', 'All-rounder', 400, 12, 11, 'Kung Fu Pandya'),
('Rashid Khan', 'GT', 'Bowler', 50, 18, 10, 'Rashid'),
('MS Dhoni', 'CSK', 'WK-Batter', 350, 1, 8, 'Thala'),
('Andre Russell', 'KKR', 'All-rounder', 300, 10, 8, 'Dre Russ'),
('Shubman Gill', 'GT', 'Batter', 600, 1, 7, 'Prince'),
('Yuzvendra Chahal', 'RR', 'Bowler', 10, 22, 6, 'Yuzi'),
('Axar Patel', 'DC', 'All-rounder', 180, 14, 5, 'Axar'),
('Trent Boult', 'RR', 'Bowler', 5, 19, 6, 'Boulty');

-- Getting column value / Selecting

SELECT * FROM ipl_players;

SELECT name, nickname, team FROM ipl_players;

-- Filtering


SELECT * FROM ipl_players WHERE team = 'MI';

SELECT name, nickname, auction_price_crores FROM ipl_players WHERE auction_price_crores >= 10;

-- ! logical operators

SELECT * FROM ipl_players WHERE wickets_taken > 10 AND role = 'All-rounder';

SELECT * FROM ipl_players WHERE team = 'CSK' OR team = 'RCB';

SELECT * FROM ipl_players WHERE team != 'RCB';

SELECT * FROM ipl_players WHERE team <> 'CSK';


-- ! Patter Matching

SELECT * FROM ipl_players WHERE name LIKE '__h%';

SELECT * FROM ipl_players WHERE name LIKE '%a%';

SELECT * FROM ipl_players WHERE team IN ('CSK', 'RCB', 'MI');

SELECT name, auction_price_crores FROM ipl_players WHERE auction_price_crores BETWEEN 10 AND 15;


-- ! Sorting

SELECT name, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores ASC;

SELECT name, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC;

SELECT team, name, auction_price_crores
FROM ipl_players
ORDER BY team ASC, auction_price_crores DESC;

-- ! pagination

SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3;

SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3 OFFSET 0;

SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3 OFFSET 3;

-- LIMIT : How many rows i want to display
-- OFFSET : How many rows i want to skip

--! Modifying data in runtime

SELECT name, nickname, 
(auction_price_crores * 100) AS auction_price_lakhs
FROM ipl_players;

--! How to get distinct values
SELECT DISTINCT role FROM ipl_players;

-- DQL - Data Query Language

