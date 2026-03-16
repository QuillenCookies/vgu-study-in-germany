# Spec: Entertainment & Events Hub (`entertainment-page-spec.md`)

## 1. PURPOSE

Provide a localized guide for students to discover permanent entertainment venues (cinemas, parks, clubs) and track upcoming dynamic/annual events (concerts, festivals) in their university city.

## 2. TECH STACK & THEME

* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (`Calendar`, `Tabs`, `Card`, `Badge`).
* **Theme (Mẫu 1):** Clean Minimalist style. Primary color: White. Accent color: Vibrant Orange. Typography: Roboto sans-serif. Large clear headings in dark blue. Layout uses a strict grid.

## 3. DATA SCHEMA (MOCK PROPS)

* `Place`: `name`, `category` (Cinema, Park, Club), `lat`, `long`.
* `Event`: `name`, `description`, `tag` (free_entry, paid), `time` (datetime), `is_annual`.
* `API Integration`: `GET /api/entertainment/places`, `GET /api/entertainment/events`.

## 4. PAGE LAYOUT & SECTIONS

### A. Filter & Control

* Toggle between "Permanent Venues" and "Upcoming Events".
* Category filters (e.g., "Free Entry", "Cultural", "Nightlife").

### B. Main Content: Venues vs. Events

* **Venues View:** A strict grid layout of venue cards. Clean white cards with thin grey borders. Displays venue name, category, and distance from the city center/university.
* **Events View:**
* A split view. On the left: A mini `Calendar` component to pick dates.
* On the right: A list of event cards sorted chronologically. Large clear headings for event names in dark blue. Time and tags (e.g., "Free Entry" in Vibrant Orange) clearly visible.
