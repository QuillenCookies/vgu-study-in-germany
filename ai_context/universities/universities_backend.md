# AI Context: University Backend (Django)

## 1. Core Models & Data Shape
This is the core anchor model. Do not add arbitrary ranking systems outside of the specified fields.

**A. `University`**
- `uni_id` (PK), `city_id` (FK to Core `City` model)
- `uni_name` (String), `type` (Choices: Public, Private)
- `language` (String, e.g., "German", "English", "Bilingual")
- `ranking_global` (Integer), `ranking_by_sub` (JSONField or String)
- `lat`, `long` (Decimal)
- `website_url` (URLField)

## 2. API Routes (Prefix: `/api/v1/universities/`)
JWT authentication required (`role=member` for GET, `admin/mod` for write).

**Endpoints:**
1. `GET /list/`: List and search universities. Filter by `city_id`, `type`, `language`, and sort by `ranking_global`.
2. `GET /{id}/`: Get detailed information about a single university.
3. `GET /compare/?uni_ids=1,2,3`: **Core App Feature (The Orchestrator).** - Returns university stats (rankings, type).
   - **Crucial:** Must internally aggregate metrics from other apps based on the university's `city_id` (e.g., `avg_rent` from Housing, `total_vegan_places` from Food, `commute_score` from Transport).

## 3. Strict Development Rules
- **Cross-App Queries:** The `/compare/` route should use efficient Django ORM `select_related` and `prefetch_related` or dedicated service functions to pull data from the Housing, Transport, and Food apps without causing N+1 query problems.
- **Data Integrity:** `ranking_by_sub` should ideally be a JSON object mapping subjects to ranks (e.g., `{"CS": 12, "Business": 5}`).
- Always return standard JSON: `{"status": "success|error", "data": {...}}`.