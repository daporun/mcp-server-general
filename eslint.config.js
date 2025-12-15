import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // -------------------------
  // 1) TYPE-AWARE (src only)
  // -------------------------
  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-floating-promises": "error",
    },
  },

  // -------------------------
  // 2) NON-TYPE-AWARE (tests, examples)
  // -------------------------
  {
    files: ["tests/**/*.ts", "examples/**/*.ts"],

    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },

    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // -------------------------
  // 3) IGNORES
  // -------------------------
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.*",
    ],
  },
];
