const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const gulpRename = require("gulp-rename");
const gulpUtil = require("gulp-util")

function sass(callback) {
    gulp.src("src/scss/style.scss")
        .pipe(gulpSass())
        .on("error", gulpUtil.log)
        .pipe(gulp.dest("src/css"))
    callback()
}

function js(callback) {
    gulp.src([
        "node_modules/bootstrap/dist/js/*.min.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/popper.min.js"
    ])
        .pipe(gulp.dest("src/js"))
    callback()
}

function watchSass(callback) {
    gulp.watch("src/scss/**/*.scss", gulp.series(sass))
    callback()
}

exports.default = gulp.series(sass, js, watchSass)