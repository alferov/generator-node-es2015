var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var path = {
  index: 'index.html',
  assets: 'app/assets',
  root: '.',
  get sass() {
    return this.assets + '/scss'
  },
  get js() {
    return this.assets + '/js'
  },
  get dist() {
    return this.assets + '/dist'
  },
  get distCss() {
    return this.dist + '/css'
  },
  get distJs() {
    return this.dist + '/js'
  },
};

gulp.task('process-styles', function() {
  return gulp.src('assets/scss/custom.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(gulp.dest(path.root));
});

gulp.task('process-scripts',  function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(path.distJs));
});

gulp.task('watch', function() {
  gulp.watch(
    [path.sass + '/**/*.scss'],
    ['styles']
  );

  gulp.watch(
    [path.js + '/**/*.js'],
    ['styles']
  );
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
