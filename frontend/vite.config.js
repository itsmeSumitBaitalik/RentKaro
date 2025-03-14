import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite' // Correct import

export default defineConfig({
  plugins: [react(), tailwind()], // Correct usage
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
})
