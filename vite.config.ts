import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  publicDir: "public",
  server: {
    open: true,
    strictPort: true,
    port: 5173,
    cors: true,
  },
  build: {
    target: "es2023",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
  },
});
