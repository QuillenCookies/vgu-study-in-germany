Create the Tools Page for a "Study in Germany" platform.

**# PURPOSE**
Provide information about universities, public transportation, housing, food, and entertainment for international students in Germany.

**# TECH STACK**

* Backend: Django + SQLite (Focus only on the frontend for this task)
* Frontend: React JS, TypeScript, Tailwind CSS
* Architecture: Component-based design


# UI/UX Specification: The Duck's Ledger (Financial Toolkit)

## 1. Page Concept & Narrative
- **Name:** The Duck's Ledger
- **Tagline:** "Master the math of your migration."
- **Narrative:** Moving to Germany is a data challenge. From blocked accounts to rent in Munich, we’ve aggregated the latest market data to help you calculate exactly what it takes to be "self-sufficient." No more guesswork—just insights.
- **Visual Style:** Modern Dashboard, interactive sliders, clean data visualizations (Charts), and high-contrast typography.

---

## 2. Hero Section: "Plan Your Flight"
- **H1:** Your Financial Blueprint for Germany.
- **Sub-headline:** "From your first Visa fee to your last Mensa meal. Use our data-driven tools to estimate your self-sufficiency costs and currency conversions in real-time."
- **Visual:** A minimalist "Dashboard" feel with a subtle animated line chart in the background.

---

## 3. Tool 1: The "Self-Sufficiency" Calculator
*This is the core engine that calculates the total cost of moving and living.*

- **Phase A: Initial Launch Costs (One-time)**
    - Visa & APS Fees (Pre-set values).
    - Flight Ticket (Slider: 600€ - 1,200€).
    - Blocked Account (Sperrkonto): Automatically set to the latest German legal requirement (~11,904€/year).
- **Phase B: Monthly Survival (Recurring)**
    - Rent: (Linked to the "Nest Finder" tool below).
    - Health Insurance: (Fixed student rate ~120€).
    - Food & Groceries: (Slider: 150€ - 400€).
- **Interactive Output:** A "Total Monthly Burn Rate" card that updates in real-time.
- **Witty Note from Die Ente:** "Quack! Based on your budget, you're a 'Thrifty Duck' or a 'Golden Goose'."

---

## 4. Tool 2: The Nest Finder (Housing Estimator)
*Predicting rent based on German city tiers.*

- **Selection 1 (City Category):**