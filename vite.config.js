import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "./docs",
    minify: false,
    sourcemap: true,
  },
});
