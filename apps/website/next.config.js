const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com'],
  },
});
