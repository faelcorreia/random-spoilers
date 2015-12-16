var gulp = require('gulp')
var rimraf = require('gulp-rimraf')
var sass = require('gulp-sass')
var connect = require('gulp-connect')
var bower = require('gulp-bower')
var concat = require('gulp-concat')
var replace = require('gulp-replace')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var argv = require('yargs').argv
var gulpif = require('gulp-if')
var plumber = require('gulp-plumber')

var bower_dir = 'bower_components'
var master_dir = 'master'
var public_dir = 'public'

var vendors = {
    scripts: [
        bower_dir + '/angular/angular.js',
        bower_dir + '/angular-i18n/angular-locale_pt-br.js',
        bower_dir + '/angular-resource/angular-resource.js',
        bower_dir + '/angular-animate/angular-animate.js',
        bower_dir + '/angular-ui-router/release/angular-ui-router.js'
    ]
}

var master = {
    scripts: [
        master_dir + '/js/app.js',
        master_dir + '/js/controllers/*.js',
        master_dir + '/js/directives/*.js',
        master_dir + '/js/filters/*.js',
        master_dir + '/js/services/*.js'
    ],
    sass: [
        master_dir + '/sass/style.scss'
    ],
    root: [
        master_dir + '/root/**/*'
    ]
}

gulp.task('clean', function() {
    return gulp.src(public_dir, {
            read: false
        })
        .pipe(rimraf())
})

gulp.task('bower', function() {
    return bower(bower_dir)
})

gulp.task('root', function() {
    return gulp.src(master.root)
        .pipe(gulp.dest(public_dir))
})

gulp.task('sass', function() {
    gulp.src(master.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCss({
            compatibility: 'ie8',
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(public_dir + '/css'))
})

gulp.task('scripts', function() {
    return gulp.src(master.scripts)
        .pipe(concat('app.js'))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulp.dest(public_dir + '/js'))
})

gulp.task('base', ['bower'], function() {
    return gulp.src(vendors.scripts)
        .pipe(concat('base.js'))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulp.dest(public_dir + '/js'))
})

gulp.task('watch', ['root', 'scripts', 'sass', 'bower', 'base'], function() {
    gulp.watch(master.scripts, ['scripts'])
    gulp.watch(master_dir + '/sass/*.scss', ['sass'])
    gulp.watch(master.root, ['root'])
    gulp.watch('bower.json', ['base'])
})

gulp.task('connect', function() {
    connect.server({
        root: public_dir,
        port: process.env.PORT || 8080,
        livereload: false
    })
})

gulp.task('default', ['clean'], function() {
    if (argv.prod)
        gulp.start(['root', 'scripts', 'sass', 'bower', 'base'])
    else
        gulp.start(['connect', 'watch'])
})