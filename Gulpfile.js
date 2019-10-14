const { src, dest, parallel, series, watch } = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var config = require('./build/config');
var sourcemaps = require('gulp-sourcemaps');
var yaml = require('gulp-yaml');

// Create TypeScript project from tsconfig.json
var tsClientProject = ts.createProject("tsconfig.json", {
    typescript: require("typescript")
});

// Cleanup by deleting target directory
function clean() {
    return del(config.CLEAN);
}

// Compile Typescript files
function app() {
    return src(config.TS_SOURCES)
        .pipe(sourcemaps.init())
        .pipe(tsClientProject())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.APP_DIST));
}

// Copy package.json
function appPackage() {
    return src(["package.json"])
        .pipe(dest(config.APP_DIST));
}

// Compile YAML files
function copyYaml() {
    return src('./*.yaml')
        .pipe(yaml({ space: 2 }))
        .pipe(dest('./'));
}

const defaultTasks = series(clean, app, appPackage, copyYaml);

exports.clean = clean;
exports.default = defaultTasks;
