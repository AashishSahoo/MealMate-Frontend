import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:4000",
        target: "https://mealmate-backend-1ao8.onrender.com",

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
