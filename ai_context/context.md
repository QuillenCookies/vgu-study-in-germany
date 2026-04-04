# PROJECT OVERVIEW

# Project name:
Study in Germany Guide

# Goal:
Provide information about universities, public transportation, housing, food, and entertainment for international students in Germany.

# Main sections:
- Universities
- Transport
- Housing
- Food
- Entertainment

# Target users:
International students.

# TECH STACK
- Frontend: React JS, TypeScript, Tailwind
- UI Components: `21st.dev components` and `shadcn/ui style components`
- Backend: Django API routes
- Database: PostgreSQL

---

# PROJECT STRUCTURE

```text
.
├── .gitignore
├── dev.ps1
├── dev.sh
├── LICENSE
├── package-lock.json
├── README.md
├── tree.txt
├── ai_context/
│   ├── api.md
│   ├── context.md
│   ├── database.md
│   ├── footer.md
│   ├── navbar.md
│   ├── translations.md
│   ├── community/
│   │   ├── community_content.md
│   │   └── community_ui.md
│   ├── contributor/
│   │   └── Contributor_System.md
│   ├── entertainment/
│   │   ├── content.md
│   │   └── entertainment_backend.md
│   ├── food/
│   │   ├── content.md
│   │   └── food_backend.md
│   ├── home/
│   │   ├── content.md
│   │   └── home_backend.md
│   ├── housing/
│   │   ├── content.md
│   │   └── housing_backend.md
│   ├── navbar_for_AI/
│   │   ├── content.md
│   │   └── ui.md
│   ├── tools/
│   │   ├── content.md
│   │   └── ui.md
│   ├── train/
│   │   ├── content.md
│   │   └── train_backend.md
│   └── universities/
│       ├── content.md
│       └── universities_backend.md
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── db.sqlite3
│   ├── manage.py
│   ├── README.md
│   ├── requirements.txt
│   ├── test_api.ipynb
│   ├── backend/
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── __init__.py
│   └── devserver/
│       ├── admin.py
│       ├── apps.py
│       ├── db_api.py
│       ├── tests.py
│       ├── urls.py
│       ├── __init__.py
│       ├── management/
│       │   ├── __init__.py
│       │   └── commands/
│       │       ├── seed_db.py
│       │       └── __init__.py
│       ├── migrations/
│       │   ├── 0001_initial.py
│       │   └── __init__.py
│       ├── models/
│       │   ├── core.py
│       │   ├── food.py
│       │   ├── housing.py
│       │   ├── train.py
│       │   ├── university.py
│       │   └── __init__.py
│       └── views/
│           ├── base.py
│           ├── train.py
│           ├── __init__.py
│           └── __pycache__/
│               ├── base.cpython-312.pyc
│               ├── train.cpython-312.pyc
│               └── __init__.cpython-312.pyc
├── brainstorm/
├── database/
│   ├── 01_schema_init_v1.sql
│   ├── 01_schema_init_v2.sql
│   ├── 02_initial_data.sql
│   ├── data/
│   │   ├── aca_highlights.csv
│   │   ├── c_aliases.csv
│   │   ├── cities.csv
│   │   ├── dish_ingredients.csv
│   │   ├── dishes.csv
│   │   ├── events.csv
│   │   ├── ingredients.csv
│   │   ├── languages.csv
│   │   ├── nations.csv
│   │   ├── parent_stations.csv
│   │   ├── places.csv
│   │   ├── route_types.csv
│   │   ├── states.csv
│   │   ├── station_route_types.csv
│   │   ├── stop_route_types.csv
│   │   ├── stop_times.csv
│   │   ├── stop_to_stations.csv
│   │   ├── subjects.csv
│   │   ├── uni.csv
│   │   ├── uni_highlights.csv
│   │   ├── uni_languages.csv
│   │   └── uni_subject_ranks.csv
│   ├── latest/
│   │   ├── agency.txt
│   │   ├── attributions.txt
│   │   ├── calendar.txt
│   │   ├── calendar_dates.txt
│   │   ├── feed_info.txt
│   │   ├── routes.txt
│   │   ├── stops.txt
│   │   ├── stop_times.txt
│   │   └── trips.txt
│   └── utils/
│       └── test.ipynb
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── ts_errors.txt
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vercel.json
    ├── vite.config.ts
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── assets/
        │   ├── menu-hamburger.svg
        │   └── navbar_vgu_wide.png
        ├── components/
        │   ├── Footer.tsx
        │   ├── Layout.tsx
        │   ├── Navbar.tsx
        │   ├── PageTransition.tsx
        │   ├── ScrollToTop.tsx
        │   ├── SiteFooter.tsx
        │   ├── icons/
        │   │   └── HamburgerIcon.tsx
        │   ├── legal/
        │   │   └── TenantRights.tsx
        │   ├── pages/
        │   │   ├── entertainment/
        │   │   └── train/
        │   │       ├── CommuteExplorer.tsx
        │   │       ├── JourneyCalculator.tsx
        │   │       └── TransitKnowledgeBase.tsx
        │   └── ui/
        │       ├── badge.tsx
        │       ├── button.tsx
        │       └── carousel.tsx
        ├── context/
        │   └── UniversityContext.tsx
        ├── contexts/
        │   ├── LanguageContext.tsx
        │   └── ThemeContext.tsx
        ├── hooks/
        ├── lib/
        │   ├── translations.ts
        │   └── utils.ts
        ├── pages/
        │   ├── CareerPage.tsx
        │   ├── CommunityPage.tsx
        │   ├── ContributorsPage.tsx
        │   ├── EntertainmentPage.tsx
        │   ├── FoodPage.tsx
        │   ├── HealthWellnessPage.tsx
        │   ├── HomePage.tsx
        │   ├── HousingPage.tsx
        │   ├── LegalCompassPage.tsx
        │   ├── Library.tsx
        │   ├── SalaryPage.tsx
        │   ├── ToolsPage.tsx
        │   ├── TrainPage.tsx
        │   └── UniversitiesPage.tsx
        └── types/
```

---

# UI DESIGN SYSTEM

Style:
Minimal
Modern
Clean
Student friendly

Spacing:
Use Tailwind spacing scale.

Cards:
Rounded corners
Soft shadow

Buttons:
Rounded
Primary color
Hover animation

---

# COMPONENT RULES

Always use reusable components.

Example components:
- Navbar
- Hero
- Card
- Section
- Footer

Do not create duplicated components.

Prefer composition over inline UI code.

---

# API RULES

- Use Django API routes.
- List of APIs: `/ai_context/api.md`.
- Roles: `admin` (all), `moderator` (update content, settings) and `member`(read-only, report, etc)

Return JSON responses.

---

# DATABASE RULES

Database Schema included in `./database/01_schema_init_v1.sql`.

---

# CODING RULES

- Use functional React components and organize code into components
- Use TypeScript
- Avoid inline styling, prefer Tailwind classes