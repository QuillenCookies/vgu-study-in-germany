# Spec: Housing & District Guide Page (`housing-page-spec.md`)

## 1. PURPOSE
Provide international students with a neighborhood-level (Ortsbezirke) guide to living in German cities. Due to GDPR, this page does not list individual properties. Instead, it analyzes districts based on average rent, commute times to the university, proximity to amenities, and cost of living to help students decide *where* to search for housing.

## 2. TECH STACK & THEME
* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (`Card`, `Badge`, `Accordion`, `Dialog`, `Slider`).
* **Map Integration:** Placeholder for OpenRouteService map component (`react-leaflet`).
* **Theme (Mẫu 3):** Detail view aesthetic. Clean white space, strict alignment, thin grey borders, no shadows. High contrast and highly scannable data.

## 3. DATA SCHEMA (MOCK PROPS)
Component must accept data reflecting the updated GDPR-compliant schema:
* `District (Ortsbezirk)`: `name`, `avg_rent` (median/mean), `electricity_cost`, `water_cost`, `food_cost`, `lat`, `long` (coordinates of the district center).
* `City`: `city_name`, `global_avg_rent`, `global_avg_col`.
* `University`: `lat`, `long` (for commute calculation from district centers).
* `Amenities`: Distance metrics from the district center to hospitals and restaurant hubs.

## 4. PAGE LAYOUT & SECTIONS

### A. Control Bar (Top)
* Below the global Navbar, add a functional filter bar.
* Inputs: "Select City" dropdown, and a "Max Average Rent" slider.
* Action: "Compare Universities" button (opens a modal with a data table comparing `global_avg_rent` and utilities between two selected universities).

### B. Main Content: 2-Column Desktop Grid (Stacks on Mobile)

#### Left Column: District (Ortsbezirke) Cards
* A scrollable vertical list of neighborhood cards instead of individual houses.
* **Card Design:**
    * **Header:** District Name in dark blue.
    * **Price:** Display `avg_rent` in bold, Vibrant Orange. Display combined average utilities/food below it in smaller, muted dark blue text.
    * **Commute Tag:** Display a static cached_commute_time (e.g., "15 min 🚆") passed down from the backend. CRITICAL: Do NOT attempt to fetch live GTFS or OpenRouteService transit data dynamically for every card in the list on the client side.
    * **Amenities:** Small text/icons indicating access to hospitals and food/restaurant hubs.

#### Right Column: Map & Survival Guide (Sticky)
* **Top Half (The Neighborhood Map):** A map view showing the selected city. Use thin black lines for routes. Use an orange dot for the University, and blue shaded circles (or distinct markers) to represent the centers of the `Ortsbezirke`.
* **Bottom Half (Survival Guide):** An `Accordion` component containing standard text advice and external resources:
    * *How to Find Housing:* Since we don't list properties, provide a structured list/buttons suggesting how to look up actual listings (e.g., links to WG-Gesucht, ImmoScout24, or Facebook groups).
    * *Contracts & Law:* Advice on reading rental contracts, rules on Kaution (deposit), and avoiding housing scams.
    * *Utility Lookups:* Guidance on how to register for electricity and water in Germany.