/*jslint node: true */
'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');

var path = {
  root: 'app',
  bower: 'bower_components',
  assets: 'app/assets',
  get index() {
    return this.root + '/index.html';
  },
  get sass() {
    return this.assets + '/scss';
  },
  get js() {
    return this.assets + '/js';
  },
  get dist() {
    return 'dist';
  },
  get distCss() {
    return this.dist + '/css';
  },
  get distJs() {
    return this.dist + '/js';
  }
};

gulp.task('vendors', function() {

  return gulp.src(mainBowerFiles('**/*.js'))
    .pipe(plugins.concat('vendors.js'))
    .pipe(gulp.dest(path.distJs + '/vendors'));
});

gulp.task('scripts', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(path.distJs))
    .pipe(reload({once: true, stream: true}));
});

gulp.task('styles', function() {

  return gulp.src(path.sass + '/custom.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: [
        path.bower + '/bootstrap-sass-official/assets/stylesheets',
      ]
    }))
    .pipe(gulp.dest(path.distCss))
    .pipe(reload({once: true, stream: true}));
});

gulp.task('templates', function() {

  var css = gulp.src(path.distCss + '/*.css');
  var js = gulp.src(path.distJs + '/*.js');
  var vendors = gulp.src(path.distJs + '/vendors/*.js');

  var target = gulp.src(path.index)
    .pipe(gulp.dest(path.dist));

  return target
    .pipe(plugins.inject(js, {
      relative: true,
    }))
    .pipe(plugins.inject(vendors, {
      relative: true,
      name: 'vendors'
    }))
    .pipe(plugins.inject(css, {
      relative: true,
    }))
    .pipe(gulp.dest(path.dist))
    .pipe(reload({once: true, stream: true}));
});

gulp.task('serve', ['vendors', 'scripts', 'styles'], function() {
  browserSync.init({
    watchTask: true,
    debugInfo: true,
    server: path.dist,
    logConnections: true,
    notify: true
  });

  gulp.watch(
    [path.sass + '/**/*.scss'],
    ['styles']
  );

  gulp.watch(
    [path.js  + '/**/*.js'],
    ['scripts']
  );

  gulp.watch(
    [path.root  + '/**/*.html'],
    ['templates']
  );
});

gulp.task('default', ['serve'], function() {

});
