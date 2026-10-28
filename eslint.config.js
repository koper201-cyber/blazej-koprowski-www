import js from "@eslint/js";
import ts from "typescript-eslint";
import astro from "eslint-plugin-astro";
export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "generated-images/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        URL: "readonly",
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        fetch: "readonly",
      },
    },
  },
];
