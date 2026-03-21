# AI Context: Entertainment Backend (Django)

## 1. Core Models & Data Shape
We have two main concepts. Do not create extra fields outside of these parameters.

**A. `Place` (Fixed venues: Cinemas, Clubs, Parks)**
- `place_id` (PK), `city_id` (FK)
- `name`, `category` (Choices: CINEMA, THEATER, CLUB, etc.)
- `tag` (string, e.g., "costly, techno")
- `lat`, `long` (Decimal)

**B. `Event` (Time-bound: Concerts, Festivals)**
- `event_id` (PK), `city_id` (FK)
- `name`, `description`
- `tag` (Choices: CONCERT, FESTIVAL, FREE_ENTRY, etc.)
- `time` (Datetime), `duration`
- `is_annual` (Boolean), `time_of_year` (String, e.g., "October")

## 2. API Routes (Prefix: `/api/v1/entertainment/`)
All routes require JWT authentication. 
- `role=member`: Read-only (GET).
- `role=admin` or `moderator`: Write access (POST, PUT, DELETE).

**Endpoints:**
1. `GET /places/` & `GET /events/`: Standard list/search. Must support query filtering by `city_id`, `category`, and `tag`.
2. `GET /events/upcoming/`: Core feature. Returns events happening within the next 14 days for the user's `city_id`.
3. `GET /compare/?city_ids=1,2`: Aggregation route. Returns total counts of places (by category) and events (by tag) to compare cities. Do not return raw lists here; return calculated metrics.

## 3. Strict Development Rules
- Use functional views or standard ViewSets.
- Always return standard JSON: `{"status": "...", "data": {...}}`.
- Never return raw HTML errors. Catch exceptions.