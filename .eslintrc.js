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
    'react-hooks/exhaustive-deps': 'off',
    'react/no-did-update-set-state': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'semi': 'off',
  },
};
