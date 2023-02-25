module.exports = {
  '*.{js,jsx,ts,tsx,json}': ['pnpm run format'],
  '**/*.ts?(x)': () => 'turbo run check-types',
  '*.{js,jsx,ts,tsx}': ['turbo run lint-fix', 'turbo run lint'],
};
