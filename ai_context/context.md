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
root/
├── ai_context/
│   ├── universities/
│   ├── commute/
│   ├── housing/
│   ├── food/
│   └── entertainment/  
├──frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
|   |   |   ├── EntertainmentPage.tsx
|   |   |   ├── HomePage.tsx
|   |   |   ├── UniversitiesPage.tsx
|   |   |   ├── TrainPage.tsx
|   |   |   ├── FoodPage.tsx
|   |   |   └── HousingPage.tsx
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend/
│   ├── backend/
│   ├── devserver/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── .gitignore
├── manage.py
└── requirements.txt
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