# generator-node-es2015

> A Yeoman generator for creating ES2015 JavaScript modules with legacy support using Babel, Webpack, Mocha, Chai, Isparta, ESLint

## Features
1. **ES2015** - generator-node-es2015 uses Babel to transpile ES2015 source code.
There are several reasons to use ES2015 alongside with transpilation:
  - The transpiled code will work with legacy Node versions;
  - Seamless migration after you decide to drop 0.x.x support;
1. **ES2015 Tests** - Mocha flag `--compilers js:babel-core/register` (it's already preconfigured in the npm `test` script) allows to transpile Mocha tests written with ES2015 on the fly.
1. **TDD** - The package has a particular npm script `npm run tdd` to start a Mocha watch task that reruns tests on file changes.
1. **Git Hooks** - Every time before commiting, [husky](https://github.com/typicode/husky) runs npm tasks conveniently configured in the package.json (in this case it automatically starting both `test` and `build` tasks). You can temporary disable this feature by adding `--no-verify` flag (i.e `$ git commit -am "Beep bop" --no-verify`). The list of all available hooks can be found [here](https://github.com/typicode/husky/blob/master/hooks.json).

## Installation
```bash
# Install Yeoman and the UJSM generator globally
$ npm install -g yo generator-node-es2015

# Make a new folder & open it
$ mkdir my-shiny-module && cd $_

# Run the generator
$ yo node-es2015
```

## Workflow
- `npm run build` - Build task that generates both minified and non-minified scripts;
- `npm run test` - Run Mocha tests once;
- `npm run tdd` - Run Mocha tests & watch files for changes;
- `npm run tdd-browser` - Run Karma (w/ Mocha) tests & watch files for changes;
- `npm run coverage` - Run Isparta, a code coverage tool;

## License
MIT © [Philipp Alferov](https://github.com/alferov)
