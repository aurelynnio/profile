import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ['backend/**', 'node_modules/**', '.next/**', 'dist/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default eslintConfig;
