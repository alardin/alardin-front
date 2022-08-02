module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
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
      },
    },
  ],
};
