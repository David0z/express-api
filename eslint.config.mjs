import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [2, { semi: true }],
      quotes: ['error', 'single'],
      'no-console': 0,
      'no-var': 'error',
      'prefer-const': 'error',
      'typescript-eslint': [{ 'no-unused-vars': 1 }],
    },
  },
];
