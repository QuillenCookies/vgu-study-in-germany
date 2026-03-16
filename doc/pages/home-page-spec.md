# Spec: Home Page (`home-page-spec.md`)

## 1. PURPOSE
Provide the landing page for the "Study in Germany" platform. It acts as the primary entry point for international students to search for cities and navigate the 5 main dimensions: University, Housing, Commute, Food, and Entertainment.

## 2. TECH STACK & THEME
* **Frontend:** React JS, TypeScript, Tailwind CSS.
* **UI Library:** `shadcn/ui` (strictly use standard components).
* **Theme:** Clean Minimalist German aesthetic. 
    * Primary Background: White.
    * Text: Dark Navy Blue (Headings) and Black (Body).
    * Accent/Action: Vibrant Orange.
    * Typography: Roboto sans-serif.
    * Styling rules: Strict grid layout, thin grey borders, NO shadows. Functional and professional (University Portal feel).

## 3. DATA & STATE
* **Search Autocomplete:** The search bar should be prepared to fetch from the `city` database table (`city_name`, `state`, `post_code`) via a future API endpoint.

## 4. PAGE LAYOUT & SECTIONS

### A. Navbar
* Include a Logo placeholder (left) and a Hamburger Menu / Desktop Links (right).
* Links: Home, University, Bahn, Housing, Food, Entertainment.
* Style: Sticky top, white background, thin grey bottom border.

### B. Hero Section (Smart Search)
* **Layout:** Centered content over a clean, high-resolution (4k feel) background image of a diverse group of college students in an outdoor campus setting (use an Unsplash placeholder with a slight white/grey overlay for text readability).
* **Typography:** Large, clear, dark blue heading: "Navigate Your German Student Life".
* **Search Bar:** Prominent, centered input field. Placeholder: "Find your city (e.g., Munich, Berlin)". Include a Vibrant Orange "Explore" button next to it.

### C. The "5 Dimensions" Quick Links
* Below the hero, a strict 5-column grid (or wrapping flexbox for mobile) displaying minimalist cards for: University, Housing, Commute, Food, Entertainment.
* Each card gets a simple `lucide-react` icon, a dark blue title, and a thin grey border. Hover effect: Border turns Vibrant Orange (no shadow).

### D. Footer
* 4-column grid (Brand Info, Useful Links, Socials, Newsletter).
* Newsletter interaction: Mock an async handler. On submit -> disable input -> change button to "Subscribing..." -> display success message.