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

    // var prompts = [{
    //   name: 'appName',
    //   message: 'What is your app\'s name ?'
    // }];
    //
    // this.prompt(prompts, function(props) {
    //   this.appName = props.appName;
    //   done();
    // }.bind(this));

    done();
  },
  scaffoldFolders: function() {
    this.mkdir("app");
    this.mkdir("app/assets");
  },
  copyFiles: function() {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html')
    );
  }
});

module.exports = OnepageGenerator;
