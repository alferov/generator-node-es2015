'use strict';
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
  // askFor: function() {
  //   var done = this.async();
  //
  //   if (!this.options['skip-welcome-message']) {
  //     this.log(require('yosay')());
  //     this.log(chalk.magenta(
  //       'Out of the box I include Gulp, Browser Sync, Sass' +
  //       'Main Bower Files to include all bower dependencies to build your app.'
  //     ));
  //   }
  //
  //   var prompts = [{
  //     type: 'checkbox',
  //     name: 'features',
  //     message: 'What more would you like?',
  //     choices: [{
  //       name: 'Sass',
  //       value: 'includeSass',
  //       checked: true
  //     }, {
  //       name: 'Bootstrap',
  //       value: 'includeBootstrap',
  //       checked: true
  //     }, {
  //       name: 'Modernizr',
  //       value: 'includeModernizr',
  //       checked: true
  //     }]
  //   }, {
  //     type: 'confirm',
  //     name: 'includeJQuery',
  //     message: 'Would you like to include jQuery?',
  //     default: true,
  //     when: function (answers) {
  //       return answers.features.indexOf('includeBootstrap') === -1;
  //     }
  //   }];
  //
  //   this.prompt(prompts, function (answers) {
  //     var features = answers.features;
  //
  //     var hasFeature = function (feat) {
  //       return features.indexOf(feat) !== -1;
  //     };
  //
  //     // manually deal with the response, get back and store the results.
  //     // we change a bit this way of doing to automatically do this in the self.prompt() method.
  //     this.includeSass = hasFeature('includeSass');
  //     this.includeBootstrap = hasFeature('includeBootstrap');
  //     this.includeModernizr = hasFeature('includeModernizr');
  //     this.includeJQuery = answers.includeJQuery;
  //
  //     done();
  //   }.bind(this));
  // },
  copyProjectFiles: function() {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('app/index.html')
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
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );

    var bower = {
       name: this.appname,
       private: true,
       dependencies: {
         'bootstrap-sass-official': '~3.3.4'
       }
     };

     this.write('bower.json', JSON.stringify(bower, null, 2));
     this.bowerInstall();
  },
  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },
  git: function () {
    this.copy('gitignore', '.gitignore');
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
    // this.npmInstall();
  }
});

module.exports = OnepageGenerator;
