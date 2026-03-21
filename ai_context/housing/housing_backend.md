# AI Context: Housing Backend (Django)

## 1. Core Models & Data Shape
Focus strictly on rent costs, housing types, and location.

**A. `Housing` (Individual listings or aggregated nodes)**
- `hou_id` (PK), `city_id` (FK)
- `housing_type` (Choices: WG, Einzelzimmer, Studio)
- `kaltmiete` (Decimal - Base rent)
- `warmmiete` (Decimal - Rent incl. utilities)
- `lat`, `long` (Decimal)
- `data_source` (String)

**B. `City` (Aggregated Housing Data - Core App)**
- *Note:* Access `avg_rent` and `avg_col` (Cost of Living) from the City model for high-level comparisons.

## 2. API Routes (Prefix: `/api/v1/housing/`)
JWT authentication required. 

**Endpoints:**
1. `GET /listings/`: List housing options. Filter by `city_id`, `housing_type`, and `max_warmmiete`.
2. `GET /compare/?city_ids=1,2`: Aggregation route. Returns `avg_rent`, `avg_col`, and total available housing nodes grouped by type (WG vs Studio) for the requested cities.
3. `GET /resources/`: Static or DB-driven suggestions for housing laws, contract guides, and average utility costs per city.

## 3. Strict Development Rules
- **GDPR Compliance:** Do not design models to store exact landlord names, private phone numbers, or exact unit numbers unless explicitly authorized. Keep locations to general coordinates or public data sources.
- **Calculate Utilities:** If `warmmiete` is null, provide a calculated estimate based on `kaltmiete` + City's average utility cost.
- Always return standard JSON: `{"status": "...", "data": {...}}`.