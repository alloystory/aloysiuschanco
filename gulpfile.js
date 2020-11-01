const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const gulpCleanCSS = require("gulp-clean-css");
const gulpUtil = require("gulp-util")

function compile(callback) {
    gulp.src("src/scss/style.scss")
        .pipe(gulpSass())
        .on("error", gulpUtil.log)
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest("dist/css"))

    gulp.src("node_modules/@fortawesome/fontawesome-free/webfonts/**/*")
        .pipe(gulp.dest("dist/assets/fa-fonts"))

    gulp.src([
        "node_modules/bootstrap/dist/js/*.min.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/popper.min.js"
        ])
        .pipe(gulp.dest("dist/js"))

    gulp.src("src/assets/**/*")
        .pipe(gulp.dest("dist/assets/"))

    gulp.src("src/index.html")
        .pipe(gulp.dest("dist/"))
    callback()
}

function watchSass(callback) {
    gulp.watch("src/scss/**/*.scss", gulp.series(compile))
    callback()
}

exports.compile = compile
exports.default = gulp.series(compile, watchSass)