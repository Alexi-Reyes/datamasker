const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Add any specific ESLint rules here
    },
  },
];
