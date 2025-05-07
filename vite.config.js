//This code comes from the js-project, created by/taken from Monde Sineke

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        signup: resolve(__dirname, "signUp.html"),
        login: resolve(__dirname, "login.html")
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
});