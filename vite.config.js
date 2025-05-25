//This code is created by and taken from Monde Sineke

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    /* newly added */
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist" /* newly added */,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        signup: resolve(__dirname, "signUp.html"),
        login: resolve(__dirname, "login.html"),
        post: resolve(__dirname, "post.html"),
        newPost: resolve(__dirname, "newPost.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    open: true /* newly added */,
  },
});
