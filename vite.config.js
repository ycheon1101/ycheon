import { defineConfig } from "vite";

// GitHub Pages serves this repo at /ycheon/ — set VITE_BASE=/ycheon/ when building for deploy if you switch to Vite build output.
export default defineConfig({
  root: ".",
  server: {
    open: true,
    port: 5173,
  },
});
