import pluginJs from "@eslint/js";
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from "globals";

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        ...globals.node,
      },
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
];