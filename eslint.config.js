// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
    },

    rules: {
        // --- Type safety ---
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_" },
        ],

        // --- Async correctness ---
        "@typescript-eslint/no-floating-promises": "error",

        // --- Clean code ---
        "no-console": "off",
        "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },

  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.*",
    ],
  },
];
