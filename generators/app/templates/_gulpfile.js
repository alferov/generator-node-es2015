/*jslint node: true */
'use strict';
var gulp = require('gulp');
var es = require('event-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

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
    return this.root + '/dist';
  },
  get distCss() {
    return this.dist + '/css';
  },
  get distJs() {
    return this.dist + '/js';
  }
};

gulp.task('scripts', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(path.distJs))
    .pipe(reload({ stream: true }));
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
    .pipe(reload({ stream: true }));
});

gulp.task('inject', function() {

  var css = gulp.src(path.distCss + '/*.css', { read: false });
  var js = gulp.src(path.distJs + '/*.js', { read: false });
  var vendors = gulp.src(mainBowerFiles(), { read: false });

  return gulp.src(path.index)
    .pipe(plugins.inject(vendors, {
      name: 'vendors',
      relative: true
    }))
    .pipe(plugins.inject(es.merge(css, js), { relative: true }))
    .pipe(gulp.dest(path.root))
    .pipe(reload({ stream: true }));
});

gulp.task('serve', ['scripts', 'styles', 'inject'], function() {
  browserSync.init({
    watchTask: true,
    debugInfo: true,
    server: {
        baseDir: "app",
        routes: {
            "/bower_components": "bower_components"
        }
    },
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
    [path.root + '/*.html'],
    reload
  );
});

gulp.task('default', ['serve'], function() {

});
