module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  rules: {
    'prettier/prettier': 0,
    'semi': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
