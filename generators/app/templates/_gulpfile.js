var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var path = {
  root: 'app',
  bower: 'bower_components',
  get index() {
    return this.root + '/index.html';
  },
  assets: 'app/assets',
  get sass() {
    return this.assets + '/scss';
  },
  get js() {
    return this.assets + '/js';
  },
  get dist() {
    return this.assets + '/dist';
  },
  get distCss() {
    return this.dist + '/css';
  },
  get distJs() {
    return this.dist + '/js';
  },
};

gulp.task('process-styles', function() {
  return gulp.src(path.sass + '/custom.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      includePaths: [
        path.bower + '/bootstrap-sass-official/assets/stylesheets',
      ]
    }))
    .pipe(gulp.dest(path.distCss));
});

gulp.task('process-scripts',  function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(path.distJs));
});

gulp.task('vendors', function() {
  var vendors = gulp.src(mainBowerFiles());

  return gulp.src(path.index)
    .pipe(plugins.inject(vendors, {
      relative: true,
      name: 'vendors'
    }))
    .pipe(gulp.dest(path.root));
});

gulp.task('scripts', ['process-scripts'], function() {
  var target = gulp.src(path.index);
  var app = gulp.src(path.js + '/**/*.js');

  return target.pipe(plugins.inject(app, {
      relative: true,
    }))
    .pipe(gulp.dest(path.root));
});

gulp.task('styles', ['process-styles'], function() {
  var target = gulp.src(path.index);
  var app = gulp.src(path.distCss + '/**/*.css');

  return target.pipe(plugins.inject(app, {
      relative: true,
    }))
    .pipe(gulp.dest(path.root));
});

gulp.task('watch', function() {
  gulp.watch(
    [path.sass + '/**/*.scss'],
    ['styles']
  );

  gulp.watch(
    [path.js  + '/**/*.js'],
    ['scripts']
  );
});

gulp.task('browser-sync', function() {
  var files = [
    path.index,
    path.distCss,
    path.distJs
  ];

  browserSync.init(files, {
    watchTask: true,
    debugInfo: true,
    server: path.root,
    logConnections: true,
    notify: true
  });
});

gulp.task('default', function(cb) {
  runSequence('vendors', 'styles', 'scripts', 'watch', 'browser-sync', cb);
});
