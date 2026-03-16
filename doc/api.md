# API Specification: "Study in Germany" Platform

## 1. Global & Core APIs

### `GET /api/cities/search`
* **Description:** Powers the global search autocomplete for cities across Germany.
* **Query Parameters:** `q` (string) - Search query.
* **Response:**

```json
  [
    {
      "city_id": 1,
      "city_name": "Munich",
      "state": "Bavaria",
      "post_code": "80331"
    }
  ]
```

### `PUT /api/users/preferences`

* **Description:** Updates the authenticated user's profile and dietary/lifestyle preferences.
* **Request Body:**
```json
{
  "city_id": 1,
  "preferences": ["vegan", "no_beef", "walking_preferred"]
}
```


* **Response:** `200 OK` (Updated User Object)

---

## 2. University Dimension

### `GET /api/universities`

* **Description:** Fetches a list of universities filtered by city.
* **Query Parameters:** `city_id` (integer, required).
* **Response:**
```json
[
  {
    "uni_id": 101,
    "uni_name": "Technical University of Munich",
    "type": "public",
    "ranking_global": 37,
    "lat": 48.149,
    "long": 11.568
  }
]
```

### `GET /api/universities/compare`

* **Description:** Aggregates university metrics and city-level cost of living data for a 1-to-1 comparison.
* **Query Parameters:** `uni1` (integer), `uni2` (integer).
* **Response:** Returns a merged object containing both university profiles alongside their respective city's `avg_rent` and `avg_col`.

---

## 3. Housing Dimension (GDPR Compliant)

### `GET /api/housing/districts`

* **Description:** Fetches aggregated housing data at the district (Ortsbezirk) level to comply with GDPR. Does not return individual listings.
* **Query Parameters:** `city_id` (integer).
* **Response:**
```json
[
  {
    "district_name": "Maxvorstadt",
    "avg_kaltmiete": 850,
    "avg_warmmiete": 1050,
    "lat": 48.149,
    "long": 11.568,
    "distance_to_uni_km": 1.2
  }
]
```

### `GET /api/housing/guides`

* **Description:** Retrieves static survival guide content for the specified city/state (e.g., standard contract rules, deposit limits).
* **Query Parameters:** `state` (string) or `city_id` (integer).

---

## 4. Commute Dimension (Integration with ORS & GTFS)

### `POST /api/commute/route`

* **Description:** Calculates a multi-modal route between a starting coordinate and the university. Wraps OpenRouteService (walking) and GTFS/Hafas-client (transit).
* **Request Body:**
```json
{
  "origin_lat": 48.1351,
  "origin_long": 11.5820,
  "destination_uni_id": 101
}
```


* **Response:** Returns total duration, transport breakdown (`S-Bahn`, `U-Bahn`, `Walking`), and polyline arrays for map rendering.

### `GET /api/commute/delays`

* **Description:** Real-time delay checker using GTFS-RT.
* **Query Parameters:** `station_id` (string, maps to GTFS ID), `transport_type` (string).
* **Response:** Current delays in minutes and operational alerts.

---

## 5. Food Dimension (Ẩm thực)

### `GET /api/food/dishes`

* **Description:** Lists German dishes, filterable by dietary tags based on user preferences.
* **Query Parameters:** `city_id` (integer, 0 for all of Germany), `tags` (comma-separated string: vegan, no_pork).
* **Response:**
```json
[
  {
    "dish_id": 1,
    "name": "Bratwurst",
    "ingredients": ["Pork", "Spices", "Casing"],
    "has_pork": true,
    "about": "Traditional German sausage...",
    "how_to_eat": "Often served with mustard and a bread roll."
  }
]
```

### `GET /api/food/places`

* **Description:** Lists restaurants and dining locations near the university or within a city, filtered by tags (e.g., `halal`, `cheap`).
* **Query Parameters:** `city_id` (integer), `tags` (string).

### `POST /api/food/menu-scan`

* **Description:** Accepts an image of a restaurant menu, processes it via Vision AI, and cross-references extracted dishes against the `dishes` database to flag dietary warnings (e.g., contains beef/pork).
* **Request Body:** `multipart/form-data` containing the image file.
* **Response:**
```json
{
  "detected_dishes": [
    {
      "name": "Schweinebraten",
      "match_found": true,
      "warnings": ["Contains Pork", "Not Vegan"]
    }
  ]
}
```

---

## 6. Entertainment Dimension

### `GET /api/entertainment/places`

* **Description:** Fetches permanent entertainment venues.
* **Query Parameters:** `city_id` (integer), `category` (string - e.g., Cinema, Park).
* **Response:** List of places with coordinates and tags.

### `GET /api/entertainment/events`

* **Description:** Fetches dynamic or recurring events.
* **Query Parameters:** `city_id` (integer), `start_date` (ISO 8601 string).
* **Response:**
```json
[
  {
    "event_id": 201,
    "name": "Oktoberfest",
    "description": "Annual beer festival...",
    "time": "2026-09-19T12:00:00Z",
    "is_annual": true,
    "lat": 48.1315,
    "long": 11.5494
  }
]
```