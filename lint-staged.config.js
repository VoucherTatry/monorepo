module.exports = {
  '*.{js,jsx,ts,tsx,json}': ['yarn run prettier --write'],
  '**/*.ts?(x)': () => 'turbo run check-types',
  '*.{js,jsx,ts,tsx}': ['turbo run lint-fix', 'turbo run lint'],
};
