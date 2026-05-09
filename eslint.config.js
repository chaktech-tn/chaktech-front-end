const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const tseslintParser = require('@typescript-eslint/parser');

const dummySecurityPlugin = { rules: { 'detect-object-injection': { create: () => ({}) }}};

module.exports = [
  {
    ignores: ['dist/**', '.next/**', 'node_modules/**', 'coverage/**', 'messages/**', '*.json'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'jsx-a11y': jsxA11yPlugin, import: importPlugin, security: dummySecurityPlugin },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-typos': 'off',
      '@next/next/no-before-interactive-script-outside-document': 'off',
      '@next/next/no-styled-jsx-in-document': 'off',
      'import/no-unresolved': 'off',
      'react/no-unescaped-entities': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/html-has-lang': 'off',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'import/order': 'warn',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'off',
      'no-var': 'off',
      eqeqeq: 'off',
      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tseslintParser },
    plugins: { 'jsx-a11y': jsxA11yPlugin, import: importPlugin, security: dummySecurityPlugin },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-typos': 'off',
      '@next/next/no-before-interactive-script-outside-document': 'off',
      '@next/next/no-styled-jsx-in-document': 'off',
      'import/no-unresolved': 'off',
      'react/no-unescaped-entities': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/html-has-lang': 'off',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'import/order': 'warn',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'off',
      'no-var': 'off',
      eqeqeq: 'off',
      'security/detect-object-injection': 'off',
    },
  },
];