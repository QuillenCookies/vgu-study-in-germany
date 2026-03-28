# Frontend Context — VGU Study in Germany

> Tài liệu kiến trúc frontend. Cập nhật lần cuối: 2026-03-28.

---

## Stack

| Công nghệ | Phiên bản | Vai trò |
|-----------|-----------|---------|
| React | ^19.2.0 | UI Framework |
| TypeScript | ~5.9.3 | Type safety |
| Vite + SWC | ^7.x | Build tool (nhanh hơn Webpack) |
| Tailwind CSS | ^4.2.1 | Utility-first CSS |
| Framer Motion | ^12.38.0 | Animations & page transitions |
| React Router | ^7.13.1 | Client-side routing |
| Lucide React | ^0.577.0 | Icon library |
| Embla Carousel | ^8.6.0 | Carousel component |
| CVA | ^0.7.1 | Component variant management |
| clsx + tailwind-merge | latest | Class merging utilities |

---

## Cấu trúc thư mục

```
frontend/
├── src/
│   ├── App.tsx                   # Root component, định nghĩa tất cả routes
│   ├── main.tsx                  # Entry point, mount React + Providers
│   ├── index.css                 # Tailwind import + dark mode variant config
│   ├── vite-env.d.ts             # Asset type declarations
│   │
│   ├── types/                    # Domain types (extracted từ contexts)
│   │   ├── university.ts         # LocationType, LocationState
│   │   └── index.ts              # Barrel export
│   │
│   ├── contexts/                 # React Contexts + Hooks
│   │   ├── ThemeContext.tsx       # isDark, toggleTheme — lưu localStorage 'vgu_theme'
│   │   ├── LanguageContext.tsx    # lang, setLang, tr() — lưu localStorage 'vgu_lang'
│   │   └── UniversityContext.tsx  # selectedLocation, setSelectedLocation
│   │
│   ├── components/
│   │   ├── index.ts              # Barrel: export tất cả components
│   │   ├── Layout.tsx            # Wrapper: Navbar + main + Footer
│   │   ├── Navbar.tsx            # Navigation bar (dark mode toggle, lang switcher, mobile menu)
│   │   ├── Footer.tsx            # Newsletter footer với subscribe form
│   │   ├── SiteFooter.tsx        # Alternate footer (dùng trong một số pages)
│   │   ├── PageTransition.tsx    # Framer Motion fade wrapper
│   │   ├── ScrollToTop.tsx       # Auto scroll to top on route change
│   │   ├── icons/
│   │   │   ├── index.ts          # Barrel
│   │   │   └── HamburgerIcon.tsx # Custom SVG icon
│   │   ├── legal/
│   │   │   ├── index.ts          # Barrel
│   │   │   └── TenantRights.tsx  # Legal content component (dùng trong LegalCompassPage)
│   │   └── ui/                   # shadcn/ui-style primitives
│   │       ├── index.ts          # Barrel
│   │       ├── button.tsx        # Button với variants (default, outline, ghost, …)
│   │       ├── badge.tsx         # Badge với variants
│   │       └── carousel.tsx      # Embla carousel wrapper
│   │
│   ├── lib/
│   │   ├── translations.ts       # Toàn bộ chuỗi dịch (EN/DE/VN) + hàm t()
│   │   └── utils.ts              # cn() = clsx + twMerge
│   │
│   └── pages/                    # 14 page components
│       ├── HomePage.tsx
│       ├── UniversitiesPage.tsx
│       ├── TrainPage.tsx
│       ├── EntertainmentPage.tsx
│       ├── FoodPage.tsx
│       ├── HousingPage.tsx
│       ├── CommunityPage.tsx
│       ├── ToolsPage.tsx
│       ├── ContributorsPage.tsx
│       ├── LibraryPage.tsx       # (đã đổi tên từ Library.tsx)
│       ├── LegalCompassPage.tsx
│       ├── HealthWellnessPage.tsx
│       ├── CareerPage.tsx
│       └── SalaryPage.tsx
│
├── restructure.sh                # Script tái cấu trúc tự động
├── FRONTEND_CONTEXT.md           # File này
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Provider Tree

```
<StrictMode>
  <BrowserRouter>
    <UniversityProvider>      ← contexts/UniversityContext (location state)
      <ThemeProvider>         ← contexts/ThemeContext (dark/light mode)
        <LanguageProvider>    ← contexts/LanguageContext (EN/DE/VN)
          <AnimatePresence>   ← framer-motion page transitions
            <Routes>          ← 14 routes
```

---

## Routes

| Path | Component | Mô tả |
|------|-----------|-------|
| `/` | `HomePage` | Trang chủ, tìm kiếm đại học |
| `/university` | `UniversitiesPage` | Danh sách đại học (fetch `/api/universities`) |
| `/bahn` | `TrainPage` | Tàu hỏa DB Bahn |
| `/entertainment` | `EntertainmentPage` | Giải trí |
| `/food` | `FoodPage` | Ẩm thực, nhà hàng |
| `/housing` | `HousingPage` | Nhà ở |
| `/community` | `CommunityPage` | Cộng đồng |
| `/tools` | `ToolsPage` | Công cụ tiện ích |
| `/contributors` | `ContributorsPage` | Người đóng góp |
| `/community/contributor` | `ContributorsPage` | Alias |
| `/explore/library` | `LibraryPage` | Thư viện tài liệu |
| `/explore/legal` | `LegalCompassPage` | Pháp lý |
| `/explore/legal-compass` | `LegalCompassPage` | Alias |
| `/explore/health` | `HealthWellnessPage` | Sức khỏe |
| `/explore/career` | `CareerPage` | Nghề nghiệp |
| `/explore/salary` | `SalaryPage` | Lương & tài chính |

---

## Contexts & Hooks

### `useTheme()` — `contexts/ThemeContext`
```typescript
const { isDark, toggleTheme } = useTheme();
```
- `isDark: boolean` — trạng thái hiện tại
- `toggleTheme()` — bật/tắt dark mode, lưu `localStorage['vgu_theme']`
- Áp dụng class `.dark` lên `<html>` → kích hoạt Tailwind `dark:` classes

### `useLanguage()` — `contexts/LanguageContext`
```typescript
const { lang, setLang, tr } = useLanguage();
```
- `lang: 'EN' | 'DE' | 'VN'`
- `setLang(l)` — đổi ngôn ngữ, lưu `localStorage['vgu_lang']`
- `tr(section, key)` — shorthand cho hàm dịch `t(section, key, lang)`

### `useUniversity()` — `contexts/UniversityContext`
```typescript
const { selectedLocation, setSelectedLocation } = useUniversity();
```
- `selectedLocation: LocationState | null` — đại học/thành phố đang được chọn
- `setSelectedLocation(loc)` — cập nhật lựa chọn (dùng để truyền từ HomePage → UniversitiesPage)

---

## Types

### `src/types/university.ts`
```typescript
type LocationType = 'city' | 'university';

interface LocationState {
  id: number;
  name: string;
  type: LocationType;
}
```

### `src/lib/translations.ts`
```typescript
type Language = 'EN' | 'DE' | 'VN';
type SectionKey = keyof typeof translations;
type StringKey<S extends SectionKey> = keyof typeof translations[S];
function t(section: SectionKey, key: StringKey, lang: Language): string
```

---

## Dark Mode

**Cách hoạt động:**
1. `ThemeContext` toggle class `.dark` trên `<html>`
2. `index.css` khai báo `@variant dark (&:is(.dark, .dark *));` → Tailwind v4 dùng class strategy thay vì media query
3. Tất cả 14 pages đã có `dark:` prefix classes
4. Preference lưu trong `localStorage['vgu_theme']` = `'dark'` | `'light'`

**Quan trọng (Tailwind v4):** Không cần `tailwind.config.ts`. Dark mode class strategy được cấu hình trong `index.css` chứ không phải trong config file.

---

## Styling Conventions

```typescript
// Merge classes có điều kiện
import { cn } from '../lib/utils';
className={cn('base-class', condition && 'conditional-class')}

// Component variants
import { Button } from '../components/ui';
<Button variant="outline" size="sm">...</Button>

// Dark mode
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

---

## API

| Endpoint | Method | Dùng ở | Mô tả |
|----------|--------|--------|-------|
| `/api/universities` | GET | `UniversitiesPage` | Danh sách đại học từ Django backend |

Proxy cấu hình trong `vite.config.ts`:
```typescript
proxy: { '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true } }
```

---

## Barrel Imports (sau refactor)

Thay vì:
```typescript
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
```

Có thể dùng:
```typescript
import { Layout, Button, Badge } from '../components';
// hoặc
import { Button, Badge } from '../components/ui';
```

> Import cũ (direct path) vẫn hoạt động bình thường — barrel là additive.

---

## Lưu ý khi phát triển tiếp

1. **Thêm page mới**: Tạo file trong `pages/`, đặt tên `XxxPage.tsx`, thêm route trong `App.tsx`
2. **Thêm translation**: Vào `lib/translations.ts`, thêm key vào cả 3 ngôn ngữ EN/DE/VN
3. **Thêm type mới**: Nếu là domain type dùng nhiều nơi → vào `src/types/`. Nếu chỉ dùng trong 1 file → để trong file đó
4. **Dark mode**: Mọi element có màu nền/chữ sáng cần thêm `dark:` counterpart
5. **Không có Redux/Zustand**: State management thuần React Context. Nếu state phức tạp hơn, cân nhắc Zustand
