-- Override version 1

CREATE TABLE ingredients (
    ingredient_id INT PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    how_to_eat TEXT,
    has_pork BOOLEAN DEFAULT FALSE,
    has_beef BOOLEAN DEFAULT FALSE,
    has_chicken BOOLEAN DEFAULT FALSE,
    for_vegan BOOLEAN DEFAULT FALSE,
    for_vegetarian BOOLEAN DEFAULT FALSE,
    has_diary BOOLEAN DEFAULT FALSE,
    has_glutten BOOLEAN DEFAULT FALSE,
    has_nut BOOLEAN DEFAULT FALSE,
    has_shellfish BOOLEAN DEFAULT FALSE,
    has_seafood BOOLEAN DEFAULT FALSE,
    has_sugar BOOLEAN DEFAULT FALSE,
    has_salt BOOLEAN DEFAULT FALSE,
    has_high_protein BOOLEAN DEFAULT FALSE
);

CREATE TABLE dishes (
    dish_id INT PRIMARY KEY,
    city_id INT REFERENCES city(city_id), -- Có thể NULL nếu là món quốc gia
    dish_name VARCHAR(255) NOT NULL,
    description TEXT,
    about TEXT,
    price DECIMAL(10,2)
);

CREATE TABLE dish_ingredients (
    dish_id INT REFERENCES dishes(dish_id) ON DELETE CASCADE,
    ingredient_id INT REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
    PRIMARY KEY (dish_id, ingredient_id)
);

CREATE TABLE places (
    place_id INT PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    place_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    icon VARCHAR(10),
    lat DECIMAL(9,6),
    long DECIMAL(9,6),
    place_url TEXT
);

CREATE TABLE events (
    event_id INT PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(50),
    time TIMESTAMP,
    duration VARCHAR(50),
    cycle_years INT, -- Đã đổi từ is_annual
    time_of_year VARCHAR(100),
    lat DECIMAL(9,6),
    long DECIMAL(9,6),
    event_url TEXT
);