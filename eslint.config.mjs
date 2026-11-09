import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["public/js/md5.js"] }, // third-party library, not our code
  js.configs.recommended,
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: { ...globals.browser },
    },
  },
];
