module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    camelcase: 'off',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variableLike',
        format: ['camelCase'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: null,
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-unused-vars': 'warn',
  },
};
