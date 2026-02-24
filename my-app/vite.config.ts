import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/creddit-trestivo/",
  plugins: [react()],
  server: {
    host: true,
  },
});
