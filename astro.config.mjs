import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  vite: { plugins: [tailwind()] },
  site: 'https://beijing-mingzhi-construction.pages.dev',
});
