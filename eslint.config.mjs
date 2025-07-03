import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";
import pluginExpo from "eslint-plugin-expo";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules",
      "dist",
      ".expo",
      "package-lock.json",
      "eas.json",
      "react-native.config.js",
      "eslint.config.mjs"
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: true,
      },
    },
    plugins: {
      js,
      react: pluginReact,
      "react-native": pluginReactNative,
      expo: pluginExpo,
    },
    rules: {
      // JS base rules
      ...js.configs.recommended.rules,

      // React
      ...(pluginReact.configs.recommended?.rules ?? {}),

      // React Native
      ...(pluginReactNative.configs.recommended?.rules ?? {}),

      

      // Optional overrides
      "react/react-in-jsx-scope": "off", // for React 17+
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
