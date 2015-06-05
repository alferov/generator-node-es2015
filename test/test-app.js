'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('starter-pack:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates expected files', function () {
    var expected = [
      'bower.json',
      'package.json',
      'gulpfile.js',
      'app/index.html',
      'app/assets/scss/custom.scss'
      'app/assets/js/app.js'
    ];

    assert.file(expected);
  });
});
