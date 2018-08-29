var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var pump = require('pump');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


gulp.task('default', ['sass', 'compress', 'image']);

gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
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

gulp.task('image', () => {
    return gulp.src('assets/src/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('assets/img'))
})