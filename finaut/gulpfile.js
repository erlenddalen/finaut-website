/*jslint devel: true, white: true*/
'use strict';

var  gulp = require('gulp')
    ,livereload     = require('gulp-livereload')
    ,pug            = require('gulp-pug')
    ,stylus         = require('gulp-stylus')
    ,csso           = require('gulp-csso')
    ,uglify         = require('gulp-uglify')
    ,cssBase64      = require('gulp-css-base64')
    ,imagemin       = require('gulp-imagemin')
    ,rename         = require('gulp-rename')
    ,autoprefixer   = require('gulp-autoprefixer')
    ,concat         = require('gulp-concat')
    ,watch          = require('gulp-watch')
    ,notify         = require('gulp-notify')
    ,plumber        = require('gulp-plumber')
    ,adjuster       = require('gulp-css-url-adjuster')
    //,sourcemaps      = require('gulp-sourcemaps')
    ;

var prettifyHTML=true;

var dist='public/',
    sources={
      js: {
        vendor: [
          'node_modules/jquery/dist/jquery.js'
        ],
        app: [
          'src/components/**/*.js',
          'src/shared/js/**/*.js'
        ]
      },
      fonts: [
        'src/shared/fonts/finaut/fonts/*'
      ],
      images: [
        'src/images/**/*',
        'src/components/**/images/**/*',
      ],
      stylus: [
        'src/shared/css/bootstrap.css',
        'src/shared/css/bootstrap-theme.css',
        // 'node_modules/normalize.css/normalize.css',
        'src/shared/fonts/**/*.css',
        //'node_modules/font-awesome/css/font-awesome.css',
        'src/components/**/*.styl',
        'src/shared/stylus/*.styl'
      ],
      html: [
        'src/*.pug'
      ]
    },
    watch_exports=[
      dist+'css/*',
      dist+'images/*',
      dist+'js/*',
      dist+'*.html'
    ];

gulp.task('js-vendor', function(){
  return gulp.src(sources.js.vendor)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist+'js'));
});

gulp.task('js-app', function(){
  return gulp.src(sources.js.app)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist+'js'));
});

gulp.task('js', ['js-vendor', 'js-app']);

gulp.task('stylus', function(){
  return gulp.src(sources.stylus)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cssBase64({
      extensionsAllowed: ['.gif', '.jpg', '.png'],
      maxWeightResource: 6000
    }))
    .pipe(adjuster({
      replace:  ['fonts/','../fonts/'],
    }))
    .pipe(concat('styles.min.css'))
    .pipe(csso({
      comments: 'none'
    }))
    .pipe(gulp.dest(dist+'css'));
});

gulp.task('fonts', function(){
  return gulp.src(sources.fonts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest(dist+'fonts'));
});

gulp.task('images', function(){
  gulp.src(sources.images)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(imagemin())
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace(/images/, '')
    }))
    .pipe(gulp.dest(dist+'images'));
});

gulp.task('pug', function(){
  return gulp.src(sources.html)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
      pretty: false
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('watch-live', ['watch'], function() {
  gulp.watch(watch_exports, function(evt) {
    livereload.changed(evt);
  });
  livereload.listen();
});

gulp.task('watch', function(){
  gulp.watch(sources.js.vendor,                     ['js-vendor']);
  gulp.watch(sources.js.app,                        ['js-app']);
  gulp.watch('src/**/*.styl',                       ['stylus']);
  gulp.watch('src/**/*.pug',                        ['pug']);
  gulp.watch(sources.images,                        ['images']);
});

gulp.task('default', ['js', 'pug', 'images', 'stylus', 'fonts', 'watch-live']);
