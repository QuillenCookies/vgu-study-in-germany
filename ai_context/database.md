### **Database Architecture Documentation**

**Overview**
This relational database is designed to power a comprehensive informational hub for students living and studying in Germany. It is built to support a Django backend and a React frontend, relying heavily on Many-to-Many (M2M) relationships to handle complex filtering for academic, lifestyle, and transit data.

#### **1. What Does It Have? (Domain Breakdown)**

The schema is divided into six primary domains:

* **User Management & Personalization (`users`, `preferences`, `achievements`)**
    * Handles authentication with secure, one-way password hashing.
    * Stores emails using two-way encryption (useful for password resets/OTP).
    * Features a highly granular preferences system mapped via M2M, allowing users to filter the entire platform based on dietary restrictions (vegan, halal, allergies), lifestyle, and commute preferences.
* **Geographical Hierarchy (`nation`, `state`, `cities`)**
    * A normalized, top-down structure. Cities are the central hub of the database, linking almost every other domain (universities, housing, stations, places).
    * Tracks macro-economic data like `avg_rent` and average cost of living (`avg_col`).
* **Academic Hub (`universities`, `subjects`, `aca_highlights`, `languages`)**
    * Stores core university data (public/private, global rankings, coordinates).
    * Uses complex M2M relationships to link universities to spoken languages, academic highlights (e.g., "Research Excellence"), and specific subject rankings (via the custom `uni_subject_ranks` table).
* **Housing & Accommodation (`housing`)**
    * Tracks specific student housing options (WG, Studio, Einzelzimmer).
    * Differentiates between base rent (`kaltmiete`) and warm rent (`warmmiete`), with coordinates for map integrations.
* **Transit & Commute (`parent_stations`, `stop_to_station`, `route_types`)**
    * Modeled after standard GTFS (General Transit Feed Specification) data.
    * Maps physical stops to parent transit hubs (stations) and links them to specific transport modes (S-Bahn, U-Bahn, ICE) via M2M tables.
* **Food & Leisure (`places`, `events`, `dishes`, `ingredients`)**
    * **Places:** Restaurants, libraries, and cinemas mapped to cities.
    * **Events:** Tracks both one-off and recurring cultural events/festivals.
    * **Culinary Engine:** A highly detailed food database. Places are linked to specific dishes, and dishes are broken down into M2M ingredients. The `ingredients` table acts as the master filter for all dietary flags (pork, beef, gluten, nuts, vegan).

---

#### **2. Important Files in the Stack**

Based on this architecture, the following files are critical to maintaining the database state:

* **`models.py`:** The source of truth. This file dictates the structure using Django ORM. It manages all Foreign Keys and `ManyToManyField` declarations (which automatically generate the intermediary tables like `place_dishes` and `dish_ingredients`).
* **`views.py`:** Contains the logic to query these tables. Due to the heavy M2M structure, views heavily rely on `select_related()` (for 1-to-Many like City -> State) and `prefetch_related()` (for Many-to-Many like University -> Highlights) to prevent N+1 query performance bottlenecks.
* **`seed_db.py` (Custom Management Command):** The script responsible for reading the (now infamous) CSV files and populating the SQLite/PostgreSQL database sequentially to respect Foreign Key constraints.
* **`database/data/*.csv`:** The raw data files that act as the backup state.

---

#### **3. Architectural Notes & Best Practices**

* **Security & GDPR:** Storing housing data purely via coordinates (`lat`, `long`) rather than exact street addresses is an excellent safeguard for privacy. The strict separation of one-way password hashing and two-way email encryption ensures standard security compliance.
* **The "Ingredients" Filter Pattern:** Putting the boolean flags (`has_pork`, `for_vegan`, etc.) inside the `ingredients` table rather than the `dishes` table is incredibly efficient. It allows the backend to dynamically determine if a dish is safe for a user simply by checking its constituent parts, rather than requiring manual tagging of every single dish.
* **Event Recurrence:** The `events` table uses `is_annual` (or `cycle_years`) alongside `time_of_year`. This allows the frontend to surface recurring events (like Oktoberfest or local Hessentag festivals) even if the exact datetime for the current year hasn't been finalized in the DB.
* **Maintenance Warning:** Because the database relies so heavily on Foreign Keys tied to `city_id`, attempting to delete a City will cascade and wipe out almost all related universities, housing, and places. Always use soft-deletes or ensure you actually intend to drop the data before running a delete operation on the Geography tables.