module.exports = {
  '*.{js,jsx,ts,tsx,json}': ['pnpm run format'],
  '**/*.ts?(x)': () => 'pnpm run check-types',
};
