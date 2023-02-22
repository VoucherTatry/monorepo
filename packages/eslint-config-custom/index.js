module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    jest: {
      version: 27,
    },
  },
  rules: {
    'no-console': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    // @typescript-eslint
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-throw-literal': 'off', // for CatchBoundaries
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-blocks': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/space-infix-ops': 'off',

    //import
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '*.+(css|sass|less|scss|pcss|styl)',
            patternOptions: { matchBase: true },
            group: 'unknown',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        './app/root.tsx',
        './app/entry.client.tsx',
        './app/entry.server.tsx',
        './app/routes/**/*.tsx',
        './src/pages/**/*.tsx',
        './src/pages/**/*.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['./**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
