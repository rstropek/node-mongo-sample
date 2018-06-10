var gulp = require('gulp');
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
gulp.task("clean", () => {
    del.sync(config.CLEAN);
});

// Compile Typescript files
gulp.task("app", [], () => {
    gulp.src(config.TS_SOURCES)
        .pipe(sourcemaps.init())
        .pipe(tsClientProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.APP_DIST));
        
    gulp.src(["package.json"])
        .pipe(gulp.dest(config.APP_DIST));
});

// Compile YAML files
gulp.task("yaml", [], () => {
    gulp.src('./*.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest('./'))});

gulp.task("default", ["clean", "app", "yaml"], () => { });
