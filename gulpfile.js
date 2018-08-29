var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var pump = require('pump');
var uglify = require('gulp-uglify');


gulp.task('default',['sass', 'compress']);

gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('compress', (cb) => {
    pump([
        gulp.src('assets/src/js/**/*.js'),
        concat('script.min.js'),
        uglify(),
        gulp.dest('assets/js')
    ])
})