# AI Context: Commute & Transport Backend (Django)

## 1. Core Models & Data Shape
This module relies heavily on external API caching rather than pure database storage.

**A. `Station` (Public Transit Nodes)**
- `station_id` (PK, string-based to match external GTFS ID)
- `city_id` (FK)
- `station_name` (String)
- `transport_type` (Choices: S-Bahn, U-Bahn, Bus, Tram)
- `lat`, `long` (Decimal)

## 2. API Routes (Prefix: `/api/v1/commute/`)
JWT authentication required.

**Endpoints:**
1. `GET /stations/`: List stations in a specific `city_id`. Filter by `transport_type`.
2. `GET /route/`: **Core Feature.** Accepts `start_lat`, `start_long`, `end_lat`, `end_long`. Backend queries OpenRouteService (Home -> Station -> Uni) and returns the compiled route graph.
3. `GET /live-status/?station_id=XYZ`: **Core Feature.** Queries GTFS-RT (Real-Time) or DB hafas-client to return current delays for the specified station.
4. `GET /compare/?city_ids=1,2`: Aggregation route. Compares average commute times to major universities and average monthly transit ticket prices between cities.

## 3. Strict Development Rules
- **Caching is Mandatory:** External API calls to OpenRouteService and DB GTFS must be cached using Redis or Django's cache framework to prevent rate-limiting and improve latency.
- **Graph Data Format:** Route calculations must be returned in a standardized graph/node format that the frontend can easily plot on a map component.
- Standardize all responses: `{"status": "success|error", "data": {...}}`. Catch all external API timeout errors gracefully.