# UI Specification: The Duck's Ledger (Interactive Tools Dashboard)

## 1. Visual Language & Layout
- **Layout Style:** Bento Grid (Responsive). High-end SaaS aesthetic.
- **Background:** Soft Grainy White (#FAFAFA) with a subtle "Grid" pattern (Light gray lines).
- **Core Components:** Shadcn/ui (Cards, Sliders, Tabs, Input, Select).
- **Typography:** Display: 'Geist' or 'Inter' (Bold for numbers).

---

## 2. Page Header (Hero)
- **Style:** Centered, minimalist.
- **H1:** "The Duck's **Ledger**" (Ledger in Orange #F97316).
- **Sub-heading:** "Data-driven tools to help you navigate the financial waters of Germany."
- **Interaction:** A subtle "Last updated: March 2026" badge to show reliability.

---

## 3. The Bento Grid Structure (The Toolkit)

### [CARD A] The Self-Sufficiency Engine (Large - 2/3 Width)
- **Function:** The master budget calculator.
- **Design:** A split-card layout.
    - **Left Side:** Input groups using `Tabs` (Setup Costs vs. Monthly Costs). Use `Slider` for values like Flight and Food.
    - **Right Side:** A "Live Receipt" summary. A large "Total Burn Rate" number that counts up dynamically.
- **Visual:** Use a vibrant orange background for the "Total" box to make it pop.

### [CARD B] The Nest Finder (Medium - 1/3 Width)
- **Function:** Rent estimator based on city tiers.
- **UI:** A clean `Select` menu for City Tiers (Tier A, B, C) and a `ToggleGroup` for Room Type (Dorm, WG, Studio).
- **Output:** Large text showing the estimated "Warm Rent". 
- **Sync Logic:** Changing this value must instantly update the "Rent" field in **Card A**.

### [CARD C] Currency Pond (Small - 1/3 Width)
- **Function:** VND ↔ EUR Converter.
- **Design:** Ultra-minimalist. Two large input fields with a "swap" icon (`Repeat` icon from Lucide).
- **Extra:** A small green/red trend line (sparkline) below the input to show exchange rate stability.

### [CARD D] The Minijob Work-Balance (Medium - 1/3 Width)
- **Function:** Calculate work hours.
- **Design:** A progress bar UI. 
- **Display:** "To cover your costs, you need to work **12 hours/week**."
- **Visual Alert:** If hours > 20, turn the bar Red (Legal warning for students).

---

## 4. Interaction & Logic (For AI Coder)

- **Global State:** All cards must share a single `GlobalBudgetState`. 
- **Framer Motion:** - Cards should have a subtle "hover:scale-[1.02]" effect.
    - Numbers should use a "Counter" animation (e.g., flipping digits or fast counting).
- **Logic Formula (Bavarian for Grades - Optional Addition):** - If user adds the Grade Converter, use: `1 + 3 * (Nmax - Nd) / (Nmax - Nmin)`.

---

## 5. Color & Asset Tokens
- **Primary:** Navy Blue (#0F172A)
- **Accent:** Vibrant Orange (#F97316)
- **Border:** `border-slate-200`
- **Icons:** `Calculator`, `Home`, `Coins`, `Briefcase` (from `lucide-react`).

---

## 6. Call to Action (Bottom)
- **Text:** "Calculations based on 2026 German Cost of Living Data."
- **Button:** "Export My Budget (PDF)" - *Style: Ghost button with a download icon.*