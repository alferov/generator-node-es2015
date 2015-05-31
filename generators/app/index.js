'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var OnepageGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  promptUser: function() {
    var done = this.async();

    //Welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')());
      this.log(chalk.magenta(
        'Out of the box I include Gulp, Browser Sync, Sass' +
        'Main Bower Files to include all bower dependencies to build your app.'
      ));
    }

    done();
  },
  scaffoldFolders: function() {
    this.mkdir("app");
    this.mkdir("app/assets");
  },
  copyProjectFiles: function() {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html')
    );
  },
  gulpfile: function() {
    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  },
  bower: function() {
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
    );
  },
  styles: function() {
    this.fs.copyTpl(
      this.templatePath('_custom.scss'),
      this.destinationPath('app/assets/scss/custom.scss')
    );
  },
  scripts: function() {
    this.fs.copyTpl(
      this.templatePath('_app.js'),
      this.destinationPath('app/assets/js/app.js')
    );
  },
  npm: function() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
    this.npmInstall();
  }
});

module.exports = OnepageGenerator;
