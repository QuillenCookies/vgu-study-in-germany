# Spec: Food & Dining Assistant (`food-and-dining-page-spec.md`)

## 1. PURPOSE

Help international students navigate German cuisine based on dietary restrictions (vegan, halal, allergies) and find suitable local restaurants. It includes a smart AI menu scanner to bridge the language and cultural gap.

## 2. TECH STACK & THEME

* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (`Tabs`, `Badge`, `FileUpload/Dropzone`, `Card`).
* **Theme (Mẫu 3):** Detail view aesthetic. List of 'Dishes' with small text-based tags. Clean, modern German aesthetic.

## 3. DATA SCHEMA (MOCK PROPS)

Component must handle dietary filters, dish profiles, and image uploads:

* `Dish`: `name`, `ingredients`, `has_pork`, `has_beef`, `about`, `how_to_eat`.
* `Restaurant`: `category`, `tag` (vegan, cheap), `lat`, `long`.
* `MenuScanResult`: `detected_dishes`, `warnings`.
* `API Integration`: `GET /api/food/dishes`, `GET /api/food/places`, `POST /api/food/menu-scan`.

## 4. PAGE LAYOUT & SECTIONS

### A. User Preferences Header

* Quick toggle badges for the user's saved preferences (fetched via `PUT /api/users/preferences`), e.g., [Vegan], [No Pork], [No Beef].

### B. Main Content: Tabs (Culture vs. Utility)

* **Tab 1: German Dishes & Culture**
* A grid of dish cards. Each card displays the dish name, a short description (`about`), and `how_to_eat`.
* **Tags:** Small text-based tags (e.g., "Contains Pork", "Vegan") conditionally colored (red for user's restricted items, green for safe items).


* **Tab 2: AI Menu Scanner (The Utility)**
* A dropzone to upload a photo of a restaurant menu.
* Once processed, displays a list of detected dishes with bold warnings if they violate the user's dietary preferences (e.g., "⚠️ Contains Pork").


* **Tab 3: Local Dining**
* A list of nearby restaurants (`places` table) filtered by the user's tags (e.g., cheap, fast_food, halal).
