# AI Context: Home Page Search (Django & React)

## 1. API Endpoint
**Endpoint:** `GET /api/cities/search`
**Auth:** Public (No JWT required)
**Purpose:** Handles autocomplete queries from the homepage search bar.

## 2. Backend Logic (Django)
- Accept a query string parameter `q`.
- Query the `City` model (filtering by `city_name` with `icontains`).
- Query the `University` model (filtering by `uni_name` with `icontains`).
- Limit results to the top 5-10 matches to keep the payload tiny and fast.

## 3. Response Schema
Return an array of matching city objects.

```json
{
  "status": "success",
  "data": {
    "cities": [
      { "id": 1, "name": "Berlin", "type": "city" },
      { "id": 5, "name": "Bremen", "type": "city" }
    ],
    "universities": [
      { "id": 12, "name": "Technical University of Berlin", "city_id": 1, "type": "university" }
    ]
  }
}
```