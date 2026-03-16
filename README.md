# Front-end Project

# 1. Setting up the environment

## 1.1. Version

- Node JS: v22.15.0
- NPM: 10.9.2

## 1.2. Setting up from scratch


### 1.2.1. Installing Vite:

- Install the project through `Vite`. Then choose `React` => `Typescript + SWC` => `No` (Beta) => `Yes` (Install with NPM and Start Now).

```shell
npm create vite@latest frontend # Newest version was 8.3.0
```

- Elaboration on choices:

### 1.2.2. Installing tailwind

- Install `Tailwind CSS` through NPM:

```shell
npm install tailwindcss @tailwindcss/vite
```

- Configure the Vite Plugin:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

- Import Tailwind in `vite.config.ts`:

```css
@import "tailwindcss";
```

### 1.2.3. Other dependencies

- Installing `vite-plugin-svgr` to use `svg files` directly in imports using `?react`.

```shell
npm install vite-plugin-svgr
```