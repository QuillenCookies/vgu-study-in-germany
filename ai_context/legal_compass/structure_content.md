# 📑 PROJECT BLUEPRINT: LEGAL COMPASS FEATURE
**Project:** Study in Germany Hub
**Developer:** Phạm Trọng Quý
**Scope:** Knowledge Hub for Vietnamese Students in Germany

---

## 1. DATA ARCHITECTURE (File: `database/data/legal_compass.csv`)
AI needs to structure the data using the following schema to ensure relational logic with existing `cities.csv` and `uni.csv`.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | String | Unique Identifier | `anmeldung-001` |
| `tag_group` | Enum | Classification (3 Main Tags) | `NEW_ARRIVALS`, `RESIDENCY`, `TAX_INSURANCE` |
| `german_anchor`| String | **Original German Term** (Static Label) | `Anmeldung`, `Rundfunkbeitrag` |
| `title` | String | User-facing Title (based on language) | `Đăng ký tạm trú` |
| `urgency` | Integer | Priority Level (1: High, 3: Low) | `1` |
| `timeline` | String | Recommended time to complete | `Within 14 days` |
| `summary` | String | Short snippet for the Card view | `Thủ tục bắt buộc đầu tiên khi tới Đức...` |
| `content_md` | Markdown | Detailed step-by-step guide | `### Bước 1: Đặt lịch...` |
| `checklist_json`| JSON | Array of required documents | `["Passport", "Wohnungsgeberbestätigung"]` |
| `dependency_id` | String | Prerequisite article ID | `anmeldung-001` (required for Visa) |
| `city_logic` | Boolean | Link to city-specific data | `True` (links to `cities.csv`) |

---

## 2. CONTENT CATEGORIZATION (3 MASTER TAGS)

### 🏷️ TAG 1: Mới sang Đức (The Essentials)
*Focus: Immediate actions within the first 30 days.*
1. **Anmeldung (Đăng ký cư trú):** Priority 1. The gatekeeper for all other services.
2. **Blocked Account (Tài khoản phong tỏa):** Steps to activate and get the Girokonto.
3. **Health Insurance:** Linking with university enrollment and visa.
4. **University Enrollment (Immatrikulation):** Getting the Student ID and Semesterticket.

### 🏷️ TAG 2: Giấy tờ Cư trú (Residency & Rights)
*Focus: Legal status and long-term compliance.*
1. **Aufenthaltstitel (Gia hạn Visa):** Transition from entry visa to eAT (electronic residence permit).
2. **Working Rights (Luật đi làm):** 140-day rule for international students (2024 update).
3. **Ummeldung (Chuyển địa chỉ):** Legal requirements when moving flats or cities.
4. **Consular Services:** Passport renewal and Vietnamese embassy procedures.

### 🏷️ TAG 3: Thuế & Bảo hiểm (Finance & Security)
*Focus: Financial obligations and safety nets.*
1. **Rundfunkbeitrag (Thuế Radio):** How to register, share costs, or apply for exemptions.
2. **Steuer-ID (Mã số thuế):** How to retrieve it and when to provide it to employers.
3. **Haftpflichtversicherung (Bảo hiểm trách nhiệm):** Why it’s the most important private insurance in Germany.
4. **Tax Return (Khai thuế):** How students can get tax refunds from Part-time/Werkstudent jobs.

---

## 3. FRONTEND & UI WORKFLOW

### A. The Card Component (Collapsed)
- **Top Label:** Display `german_anchor` in a small, stylized badge.
- **Main Title:** Display `title` clearly.
- **Metadata:** Show `urgency` (color-coded) and `timeline`.
- **Snippet:** Display `summary`.
- **Interaction:** "Xem thêm" button to expand or navigate.

### B. The Expanded View (Action-Oriented)
- **Quick Info Box:** Highlight the `timeline` and `dependency_id` (e.g., "Bạn cần làm Anmeldung trước").
- **Interactive Checklist:** Render `checklist_json` as a list of checkboxes so users can track their progress.
- **Markdown Body:** Render `content_md` with clear headings and Pro-tips.
- **Dynamic City Link:** If `city_logic` is True, fetch the office address or booking link from `cities.csv` based on the user's selected city.

---

## 4. AI IMPLEMENTATION PROMPT (Master Command)

> "I am developing the **Legal Compass** feature for the 'Study in Germany Hub'. Use the provided directory structure (CSV/SQL) and the following requirements:
>
> 1. **Data Generation:** Generate a sample `legal_compass.csv` containing 3 articles: 'Anmeldung', 'Aufenthaltstitel', and 'Rundfunkbeitrag'. 
>    - Ensure 'Anmeldung' is marked as a dependency for 'Aufenthaltstitel'.
>    - Use Markdown for the `content_md` field.
>    - Ensure `german_anchor` is provided for each.
> 2. **Logic Integration:** Explain how the frontend should join `legal_compass.csv` with `cities.csv` to show city-specific registration links.
> 3. **Component Code:** Write a React component using Tailwind CSS to render these articles as Expandable Cards. The UI should prioritize the 'German Anchor' as a visual identifier and include the Interactive Checklist.
> 4. **User Experience:** Ensure the tone is helpful and breaks down complex German bureaucracy into simple, actionable steps."