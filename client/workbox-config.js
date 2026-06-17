module.exports = {
  globDirectory: "dist",
  globPatterns: ["**/*.{js,css,html,png,svg,ico}"],

  swDest: "dist/sw.js",

  // optional but common
  clientsClaim: true,
  skipWaiting: true,
};