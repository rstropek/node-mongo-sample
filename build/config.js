exports.TS_SOURCES = [
    "src/**/*.ts"
];
exports.APP_DIST = "./dist";
exports.CLEAN = [
    "**/*.js.map",
    "**/*.js",
    "!node_modules/**/*.js",
    "!Gulpfile.js",
    "!build/**/*.js",
    "dist/**",
    "!dist",
    "!dist/.git",
    "api.json"
];