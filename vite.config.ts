import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

interface ImportMetaEnv {
  readonly VITE_NOTION_TOKEN: string;
  readonly VITE_NOTION_DATABASE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}