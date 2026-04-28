import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import openEditorReact from '@line-copy-open/react/vite'
import openEditor from '@line-copy-open/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    openEditorReact(),
    react(),
    openEditor({
      editor: 'code',
    }),
  ],
  server: {
    port: 48237,
  },
})
