-- INITIAL DATA SEED (HESSEN HUBS) --

-- 1. CITIES
INSERT INTO city (city_id, city_name, state, post_code, avg_rent, avg_col) VALUES
(1, 'Darmstadt', 'Hesse', '64283', 750.00, 950.00),
(2, 'Frankfurt', 'Hesse', '60311', 950.00, 1200.00),
(3, 'Dieburg', 'Hesse', '64807', 600.00, 800.00),
(4, 'Mainz', 'Rheinland-Pfalz', '55116', 800.00, 1000.00),
(5, 'Wiesbaden', 'Hesse', '65183', 850.00, 1050.00);

-- 2. UNIVERSITIES
INSERT INTO university (city_id, uni_name, type) VALUES
(1, 'TU Darmstadt', 'public'),
(2, 'Goethe University Frankfurt', 'public');

-- 3. STATIONS (IBNR Reference)
-- Storing descriptive info in the description field, name strictly cleanly sanitized.
INSERT INTO stations (station_id, city_id, station_name, transport_type, description) VALUES
('8000068', 1, 'Darmstadt', 'Train', 'Central hub for TU Darmstadt students'),
('8011160', 2, 'Frankfurt', 'Train', 'Major transit hub for the region'),
('8001396', 3, 'Dieburg', 'Train', 'Campus Dieburg location'),
('8000240', 4, 'Mainz', 'Train', 'Rheinland-Pfalz state capital'),
('8000250', 5, 'Wiesbaden', 'Train', 'Hesse state capital');
