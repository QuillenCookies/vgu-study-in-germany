# Translation System Maintenance Guide

All user-facing text strings are managed in a single file: `frontend/src/lib/translations.ts`.

## How to add a new language
1. Open `frontend/src/lib/translations.ts`.
2. Update the `Language` type: `export type Language = 'EN' | 'DE' | 'VN' | 'FR';` (To add French, for example).
3. Add the `FR` key and translation to every string object in the file.
4. Update `frontend/src/contexts/LanguageContext.tsx` to handle the new language in the `useEffect` HTML tag lang setter if needed.
5. Update `Navbar.tsx` to add the new flag and cycle logic.

## "Notes from Die Ente"
The phrase **"Notes from Die Ente"** is the brand and name of the mascot. It must **NEVER** be translated into any language. It remains hardcoded in `HomePage.tsx` and `Navbar.tsx` where applicable.

## Proper Nouns
Things like "Frankfurt", "Mensa", "WG" (Wohngemeinschaft) and link URLs are not typically translated, so they are not included in the translations file over to preserve the actual structural functionality and meaning.

## How to use in new components
1. Import the hook: `import { useLanguage } from '../contexts/LanguageContext';`
2. Destructure the shorthand translation function: `const { tr } = useLanguage();`
3. Use it in TSX: `<h1>{tr('home', 'badgeText')}</h1>`
