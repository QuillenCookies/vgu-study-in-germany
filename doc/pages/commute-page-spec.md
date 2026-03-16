# Spec: Commute Page (`commute-page-spec.md`)

## 1. PURPOSE

Provide an integrated multi-modal routing system (walking + transit) from a student's potential housing/station to the university. It also acts as a daily utility by providing real-time delay updates via GTFS-RT.

## 2. TECH STACK & THEME

* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (`Input`, `Button`, `Alert`, `ScrollArea`).
* **Map Integration:** `react-leaflet` wrapping OpenRouteService (ORS) polylines and markers.
* **Theme (Mẫu 3):** Detail view aesthetic. Simple route map using thin black lines and orange station dots. Strict alignment and clean white space.

## 3. DATA SCHEMA (MOCK PROPS)

Component must manage route generation and real-time transit status:

* `RouteData`: Total duration, array of transport steps (`S-Bahn`, `U-Bahn`, `Walking`), polyline coordinates.
* `DelayData`: `station_id`, `transport_type`, delay in minutes, operational alerts.
* `API Integration`: `POST /api/commute/route` (for the graph/path) and `GET /api/commute/delays` (for live status).

## 4. PAGE LAYOUT & SECTIONS

### A. Main Content: 2-Column Desktop Grid

#### Left Column: Route Breakdown & Alerts

* **Input Area:** "From" (Address/Station) and "To" (Pre-filled with University, but editable).
* **Live Alerts:** An `Alert` banner at the top of the route list that displays GTFS-RT data (e.g., "S-Bahn S3 is delayed by 5 minutes").
* **Step-by-Step List:** A timeline-style list showing the breakdown of the commute. Icons for walking vs. transit. Total commute time displayed prominently in bold orange.

#### Right Column: Commute Map

* A large, interactive map component.
* **Styling:** Thin black lines depicting the route path. Vibrant Orange dots for stations/stops, and a primary marker for the University.