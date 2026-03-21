/* PROJECT: German University Assistant Platform
VERSION: 1.0
DESCRIPTION: This script initializes the database schema covering 5 dimensions: 
             University, Housing, Commute, Food, and Leisure.
CONSTRAINTS: 
 - GDPR compliant housing data (coordinates only).
 - One-way hashing for passwords.
 - Two-way encryption for emails.
 - GTFS compatibility for transit stations.
*/

-- BEGIN SCRIPT --

-- 0. Setup Extensions
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. CITY TABLE (The Root)
CREATE TABLE city (
    city_id INT PRIMARY KEY, -- 0 for Deutschland
    city_name VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    post_code VARCHAR(10),
    avg_rent DECIMAL(10, 2),
    avg_col DECIMAL(10, 2)
);

-- 2. USERS TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- One-way hash (Argon2/Bcrypt)
    email_encrypted TEXT NOT NULL, -- Two-way encryption
    city_id INT REFERENCES city(city_id),
    preferences JSONB -- Stores [vegan, no_beef, etc.] as a flexible list
);

-- 3. UNIVERSITY TABLE
CREATE TABLE university (
    uni_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    uni_name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('public', 'private')),
    ranking_global INT,
    ranking_by_sub JSONB, -- Stores specific subject ranks
    lat DECIMAL(9,6),
    long DECIMAL(9,6),
    website_url TEXT,
    language VARCHAR(50)
);

-- 4. DISHES TABLE
CREATE TABLE dishes (
    dish_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id), -- 0 for National German dishes
    dish_name VARCHAR(255) NOT NULL,
    ingredients TEXT[], -- Array of ingredients
    about TEXT,
    price_avg DECIMAL(10, 2),
    how_to_eat TEXT,
    has_pork BOOLEAN DEFAULT FALSE,
    has_beef BOOLEAN DEFAULT FALSE,
    has_meat BOOLEAN DEFAULT FALSE,
    has_dairy BOOLEAN DEFAULT FALSE,
    has_seafood BOOLEAN DEFAULT FALSE,
    has_sugar BOOLEAN DEFAULT FALSE,
    is_health_warning BOOLEAN DEFAULT FALSE
);

-- 5. HOUSING TABLE (GDPR Compliant)
CREATE TABLE housing (
    hou_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    housing_type VARCHAR(50), -- WG, Einzelzimmer, etc.
    lat DECIMAL(9,6), 
    long DECIMAL(9,6),
    kaltmiete DECIMAL(10, 2),
    warmmiete DECIMAL(10, 2),
    data_source TEXT
);

-- 6. STATIONS TABLE (GTFS Based)
CREATE TABLE stations (
    station_id VARCHAR(50) PRIMARY KEY, -- GTFS ID
    city_id INT REFERENCES city(city_id),
    station_name VARCHAR(255),
    transport_type VARCHAR(50), -- S-Bahn, U-Bahn, etc.
    lat DECIMAL(9,6),
    long DECIMAL(9,6)
);

-- 7. PLACES & EVENTS
CREATE TABLE places (
    place_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    category VARCHAR(50),
    tags TEXT[], -- [vegan, halal, cheap]
    lat DECIMAL(9,6),
    long DECIMAL(9,6)
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES city(city_id),
    name VARCHAR(255),
    description TEXT,
    tags TEXT[],
    event_time TIMESTAMP,
    duration INTERVAL,
    is_annual BOOLEAN,
    time_of_year VARCHAR(50),
    lat DECIMAL(9,6),
    long DECIMAL(9,6)
);