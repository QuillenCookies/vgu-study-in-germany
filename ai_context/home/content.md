Create the Home Page for a "Study in Germany" platform.

**# PURPOSE**
Provide information about universities, public transportation, housing, food, and entertainment for international students in Germany.

**# TECH STACK**

* Backend: Django + SQLite (Focus only on the frontend for this task)
* Frontend: React JS, TypeScript, Tailwind CSS
* Architecture: Component-based design

**# PAGE LAYOUT & SECTIONS**

**1. Navbar:**

* Include a Logo placeholder.
* Menu with the following links: Home, University, Bahn, Housing, Food, Entertainment with the promt in navbar.txt

**2. Hero Section:**

* Design a minimalist and functional header with a sticky navigation bar.
* The hero area should feature a large, welcoming search bar with the placeholder text "What are you exploring today?" centered over a high-quality background image of a diverse group of college students interacting warmly in an outdoor campus or local market setting.
* Palette: A professional university-inspired palette featuring a clean white background, deep navy blue for primary text and structural elements, and a vibrant orange for the "Explore" call-to-action button to ensure high visibility and a "utility app" feel.

**3. Footer Section:**
Design a responsive, theme-adaptive footer component using `shadcn/ui` conventions (utilizing standard `Input` and `Button` components) and Tailwind CSS. Place it in a standard `@/components/ui/` directory structure.

The footer should use a 4-column grid on desktop that stacks cleanly on mobile:

* **Column 1 (Brand Info):** Include a circular logo placeholder (use an Unsplash image), the platform name "Study in Germany", and a short, welcoming description about empowering international students.
* **Column 2 (Useful Links):** Add navigation links relevant to the platform (e.g., University Applications, Find Housing, Transport Info, Visa Guides, Contact Us).
* **Column 3 (Follow Us):** Include social media links (Instagram, Facebook, X/Twitter) using icons from `lucide-react`.
* **Column 4 (Newsletter):** Create a subscription form with an email input and a "Subscribe" button.
* *Interaction Requirements:* Implement a mock async handler to simulate a network request. While submitting, disable the input and button, and change the button text to "Subscribing...". Upon completion, display a smooth fade-in overlay over the form with a success ("Subscribed! 🎉") or error message that automatically resets after 3 seconds.



**Implementation Guidelines:**

1. Generate the main layout with the Navbar, Hero Section, and Footer as described.
2. If the project doesn't already have `shadcn/ui` setup, assume standard paths (`@/components/ui`) and generate the necessary `Button` and `Input` component files automatically.
3. Install and use `lucide-react` for all icons.
4. Fill all image assets (Hero background, Footer logo) with relevant Unsplash placeholder URLs.
