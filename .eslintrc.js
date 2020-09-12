module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
  }
};