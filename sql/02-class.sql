CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team VARCHAR(50),
    role VARCHAR(50),
    run_scored INT CHECK (run_scored > 0),
    wickets_taken INT CHECK (wickets_taken > 0),
    auction_price_crores INT
);