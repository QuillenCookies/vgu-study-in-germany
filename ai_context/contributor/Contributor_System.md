# UI/UX Specification: The Migration Partners (Contributor System)

## 1. Concept: "The High-Flying Ducks"
- **Narrative:** Every note on this site started as a struggle. Our contributors are the "Pathfinder Ducks" who flew the route first and came back to map it for others.
- **Goal:** Transform the platform from a static guide into a living community database.

---

## 2. Phase 1: Hero Entry Point (The Hook)
- **Component:** A small, elegant CTA link placed directly under the main Search Bar.
- **Style:** `text-sm`, `text-slate-400`, `hover:text-orange-500`.
- **Content:** "✨ Have a survival hack? **Join the Migration** and become a contributor."
- **Interaction:** Clicking leads to `/contributors`.

---

## 3. Phase 2: "The Wall of Pathfinders" (Social Proof Section)
- **Location:** Directly below the Hero section on the Home Page.
- **Layout:** Horizontal Auto-scrolling Marquee or 4-column Bento Grid.
- **Card Design (Glassmorphism):**
    - **Avatar:** Circular profile pic with a subtle "Duck Badge" overlay.
    - **Name:** Bold, Navy Blue.
    - **Contribution Tag:** e.g., "Housing Expert" or "DB Bahn Survivor".
    - **Quote:** A 1-line impact statement: *"I saved 300€ on my deposit using this note."*
- **Visual State:** Hovering on a card reveals a "View their Notes" button.

---

## 4. Phase 3: The Contributor Hub (/contributors)
- **Hero:** "The Pathfinders who mapped the pond."
- **Leaderboard/Grid:** - A directory of all contributors.
    - Filters: `All`, `Education`, `Housing`, `Food`, `Admin`.
- **Contributor Profile Snippet:** - Name + Graduation Year (VGU).
    - Badge icons (🏅 Early Bird, 🥇 Top Mapper).
    - Total "Notes" contributed.

---

## 5. Phase 4: The "Leave a Trace" Flow (Submission UI)
- **Concept:** Keep it frictionless. No login required for the first draft (optional).
- **UI:** A clean, modal-based form.
- **Fields:**
    1. **Note Title:** e.g., "How to get Anmeldung in 3 days."
    2. **Category:** Dropdown (Housing, Transport, etc.)
    3. **The "Quack" (Content):** A Markdown-supported text area.
    4. **Your Identity:** Name & VGU Batch.
- **Submit Button:** "Quack it! 🦆" (Vibrant Orange).

---

## 6. Phase 5: Badge System (Gamification)
*Visual icons to be displayed next to names:*
- **🥉 Fledgling:** First approved note.
- **🥈 Navigator:** 5+ helpful notes.
- **🥇 Golden Feather:** Top-rated contributor of the month.
- **🎓 Alumni Star:** Verified VGU Alumni contributors.

---

## 7. Phase 6: Attribution (The Signature)
- **Component:** At the bottom of every individual "Note" or article.
- **UI:** A small "Author Box".
- **Text:** "✍️ Mapped by **[Name]** | 🏅 Navigator Pathfinder."
- **Link:** "See more notes from [Name]."

---

## 8. Technical Logic for Antigravity (AI Coder)
- **Icons:** Use `lucide-react` (UserPlus, Award, PenTool, Globe).
- **Animations:** - Use `framer-motion` for the "Wall of Pathfinders" marquee.
    - Smooth slide-in for the submission modal.
- **Color Logic:** Use **Orange (#F97316)** for all contributor-related actions and badges to signify "Active Value."