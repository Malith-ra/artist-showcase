// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Disable rules that conflict with Prettier
  configPrettier,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error', // Show Prettier issues as ESLint errors
    },
  },

  // Override default ignores
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
