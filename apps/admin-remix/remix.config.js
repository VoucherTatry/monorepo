/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  watchPaths: ["../../packages/ui"],
  serverDependenciesToBundle: ["/^@heroicons.*/", "/^ui.*/"],
  future: {
    unstable_postcss: true,
    unstable_tailwind: true,
    unstable_cssModules: true,
  },
};
