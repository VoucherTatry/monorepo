/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  watchPaths: ["../../packages/ui"],
  serverDependenciesToBundle: ["/^@heroicons.*/", "/^ui.*/"],
  future: {
    v2_routeConvention: true,
    unstable_postcss: true,
    unstable_tailwind: true,
    unstable_cssModules: true,
  },
};
