module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    camelcase: ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        format: ['snake_case', 'camelCase', 'PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: 'useRecoilCallback',
          },
        ],
        'import/no-extraneous-dependencies': 'off',
        camelcase: ['off'],
      },
    },
  ],
};
