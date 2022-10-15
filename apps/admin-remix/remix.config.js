/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  watchPaths: ["../../packages/ui"],
  serverDependenciesToBundle: ["/^@heroicons.*/", "/^ui.*/"],
};
