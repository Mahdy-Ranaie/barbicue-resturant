import react from "@eslint-react/eslint-plugin";
import next from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import-x";
import accessibility from "eslint-plugin-jsx-a11y-x";
import hooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next/", "out/", "build/", "coverage/", "next-env.d.ts"]),
  next.flatConfig.coreWebVitals,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended, react.configs["recommended-typescript"]],
    plugins: {
      "import-x": importPlugin,
      "jsx-a11y": accessibility,
      "react-hooks": hooks,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "import-x/no-anonymous-default-export": "warn",
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);
