var gulp = require("gulp");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
gulp.task("jshint", function() {
    return gulp.src("js/**/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter("default"))
});

gulp.task("sass", function() {
    return gulp.src("scss/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map'
      }).on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("css"))
});

gulp.task("default", function(){
    gulp.watch("./scss/**/*.scss", gulp.series("sass"));
    gulp.watch("./js/**/*.js", gulp.series("jshint"));
});