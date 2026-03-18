# AI Context: Food & Dining Backend (Django)

## 1. Core Models & Data Shape
Keep models strictly tied to dietary filtering, cultural info, and location.

**A. `Dish` (Cultural & Dietary Data)**
- `dish_id` (PK), `city_id` (FK, 0 = All of Germany)
- `name`, `ingredients` (ArrayField/JSONField), `about` (Text: culture/how to eat)
- `price` (Decimal)
- **Dietary Flags (Booleans):** `has_pork`, `has_beef`, `has_meat`, `has_diary`, `has_seafood`, `has_sugar`, `is_not_for_health_problem`.

**B. `Place` (Restaurants / Eateries)**
- `place_id` (PK), `city_id` (FK)
- `category` (Filter specifically for 'Restaurant', 'Cafe', 'Mensa')
- `tag` (String: e.g., "vegan, german, vietnamese, halal, fast_food")
- `lat`, `long` (Decimal)
- `dishes` (Many-to-Many relationship with `Dish`)

## 2. API Routes (Prefix: `/api/v1/food/`)
JWT authentication required. Extract `user_id` to cross-reference the `User.preference` field for auto-filtering.

**Endpoints:**
1. `GET /dishes/`: List dishes. **Must** support heavy boolean query filtering (e.g., `?has_pork=false&has_meat=false` for vegans/vegetarians).
2. `GET /restaurants/`: List places. Filter by `city_id`, `tag`. 
3. `POST /ai-menu-extract/`: **Core Feature.** Accepts image/text payload of a menu. Backend queries database (and potentially an LLM) to extract dish names and match them against known `Dish` objects, returning dietary warnings.
4. `GET /compare/?city_ids=1,2`: Aggregation route. Returns counts of restaurants by tags (e.g., "Total Vegan restaurants", "Total Asian restaurants") per city.

## 3. Strict Development Rules
- **Dietary Safety Logic:** If a user's JWT resolves to a profile with `preference=["vegan"]`, the `GET /dishes/` view must automatically apply `has_meat=False` and `has_diary=False` to the queryset.
- Standardize all responses to: `{"status": "success|error", "data": {...}}`.