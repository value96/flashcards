import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  define: {
    "process.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL),
    "process.env.VITE_MODE": JSON.stringify("dev"),
  },
})
