'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const bower = require('gulp-bower');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
var buildDir = 'public/dist';

gulp.task('clean', function() {
    return del(buildDir);
});

gulp.task('bower', function() {
    return bower()
    .pipe(gulp.dest('bower_components/'));
});

gulp.task('mainJS', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ])
        .pipe(gulp.dest('../' + buildDir + '/js'));
});

gulp.task('mainCSS', function() {
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('../' + buildDir + '/css'));
});

gulp.task('mainFonts', function() {
    return gulp.src('bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('../' + buildDir + '/fonts'));
});

gulp.task('styles', function() {
    return gulp.src('app/**/*.scss', {since: gulp.lastRun('styles')})
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('css/style.css'))
        .pipe(cleanCSS())
        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
        .pipe(gulp.dest('../' + buildDir));
});

gulp.task('scripts', function() {
    return gulp.src('app/**/*.js', {since: gulp.lastRun('scripts')})
        .pipe(concat('js/jquery.questionnaire.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../' + buildDir))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**', {since: gulp.lastRun('fonts')})
        .pipe(gulp.dest('../' + buildDir + '/fonts'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**', {since: gulp.lastRun('images')})
        .pipe(gulp.dest('../' + buildDir + '/img'));
});

// MAIN
gulp.task('main', gulp.parallel('styles','scripts'));

// VENDORS
gulp.task('vendors', gulp.series(
    'bower', 
    gulp.parallel('mainJS', 'mainCSS', 'mainFonts', 'fonts', 'images')));

// WATCH
gulp.task('watch', function() {
    gulp.watch('app/**/*.scss', gulp.series('styles'));
    gulp.watch('app/**/*.js', gulp.series('scripts'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('main', 'vendors')));

// GULP
gulp.task('default', gulp.series('build', 'watch'));
