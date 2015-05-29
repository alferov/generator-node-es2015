'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var OnepageGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    }, {
      type: 'confirm',
      name: 'addDemoSection',
      message: 'Would you like to generate a demo section ?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;
      this.addDemoSection = props.addDemoSection;

      done();
    }.bind(this));
  },
  scaffoldFolders: function() {
    this.mkdir("app");
    this.mkdir("app/css");
    this.mkdir("app/sections");
    this.mkdir("build");
  },
  copyMainFiles: function() {
    this.copy("_footer.html", "app/footer.html");
    this.copy("_gulpfile.js", "gulpfile.js");
    this.copy("_package.json", "package.json");
    this.copy("_main.css", "app/css/main.css");

    var context = {
      site_name: this.appName
    };

    this.template("_header.html", "app/header.html", context);
  },
  enerateDemoSection: function() {
    if (this.addDemoSection) {
      var done = this.async();
      this.invoke("starter-pack:section", {
        args: ["Demo Section"]
      }, function() {
        done();
      });
    } else {
      this.write("app/menu.html", "");
    }
  },
  runNpm: function() {
    var done = this.async();
    this.npmInstall("", function() {
      console.log("\nEverything Setup !!!\n");
      done();
    });
  }
});

module.exports = OnepageGenerator;
