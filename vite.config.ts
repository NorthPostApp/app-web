/// <reference types="vitest/config" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/lib/test-utils.ts"],
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-lexical": [
            "lexical",
            "@lexical/rich-text",
            "@lexical/list",
            "@lexical/react/LexicalComposerContext",
            "@lexical/react/LexicalContentEditable",
            "@lexical/react/LexicalErrorBoundary",
            "@lexical/react/LexicalListPlugin",
            "@lexical/react/LexicalRichTextPlugin",
            "@lexical/react/LexicalHistoryPlugin",
            "@lexical/react/LexicalAutoFocusPlugin",
          ],
          "vendor-jotai": ["jotai"],
          "vendor-base-ui": ["@base-ui/react"],
          "vendor-lucid": ["lucide-react"],
          "vendor-zod": ["zod"],
        },
      },
    },
  },
});
