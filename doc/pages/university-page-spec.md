# Spec: University Page (`university-spec.md`)

## 1. PURPOSE

Allow international students to perform a side-by-side comparison of universities. It evaluates not only academic rankings but also practical living dimensions such as city-level rent, cost of living, and available amenities to help students make holistic decisions.

## 2. TECH STACK & THEME

* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (`Table`, `Select`, `Badge`, `Card`).
* **Theme (Mẫu 2):** Comparison & Data Table aesthetic. Clean white background. Text colors: Black and dark navy blue. Key information highlighted in Vibrant Orange. Bold dark blue table headers. High contrast, functional design, no complex animations.

## 3. DATA SCHEMA (MOCK PROPS)

Component must accept data reflecting the aggregated comparison endpoints:

* `University Profile`: `uni_name`, `type` (public/private), `ranking_global`, `ranking_by_sub`.
* `City Metrics`: `avg_rent`, `avg_col`.
* `API Integration`: Relies primarily on the response from `GET /api/universities/compare`.

## 4. PAGE LAYOUT & SECTIONS

### A. Control Bar (Top)

* A sticky header with two large `Select` dropdowns to choose "University A" and "University B".
* Action: "Compare" button that fetches and populates the data table below.

### B. Main Content: Comparison Table

* A highly scannable, full-width `Table` component.
* **Headers:** University names in bold dark blue.
* **Rows (Categorized by Dimension):**
* **Academic:** Global Rank, Subject Rank, Public/Private status.
* **Housing (Icon: 🏠):** Average Rent (`avg_rent`), mapped against the city ID. Highlight the cheaper option in Vibrant Orange.
* **Living Costs (Icon: 💶):** Average Cost of Living (`avg_col`).
* **Transport (Icon: 🚆):** Availability of local transit options (S-Bahn, U-Bahn) based on city data.