module.exports = {
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'import/order': [
          'error',
          {
            groups: ['external'],
          },
        ],
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
  globals: {
    globalThis: false,
  },
};
