import { defineConfig } from "vite";

// GitHub Pages serves this repo at /ycheon/ — set VITE_BASE=/ycheon/ when building for deploy if you switch to Vite build output.
export default defineConfig({
  root: ".",
  server: {
    open: true,
    port: 5173,
  },
  plugins: [
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const raw = req.url && req.url.split("?")[0];
          if (
            raw &&
            raw !== "/" &&
            !raw.startsWith("/@") &&
            !raw.startsWith("/assets") &&
            !raw.startsWith("/node_modules") &&
            !raw.includes(".")
          ) {
            req.url = "/index.html";
          }
          next();
        });
      },
    },
  ],
});
