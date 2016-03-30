# Grunt SF Jedi

This is a set of [`grunt`][grunt] tasks for the [`sf-jedi`][sf-jedi] package.
if you are not familiar with grunt then you can take a look
through the provided link

The tasks basically expose functionality from the
Salesforce metadata api via [JSforce][jsforce].
See the linked [repo][sf-jedi] for more details

## Install

If you dont have `grunt` install the grunt-cli via

```sh
npm install -g grunt-cli
```

Install these grunt tasks and add to dev dependencies  with

```sh
npm install grunt-sf-jedi --save-dev
```

## Usage  

You need a `Gruntfile.js` in your project root so here is an example one:

```javascript
'use strict';

// This is an example file of some Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // Set the default config stuff
    force: {
      // Setup the base options
      options: {
        //=============================================================
        // All of these are set in my .env in the project root folder and
        // I am using 'dotenv' package to load them
        //=============================================================
        // username: process.env.SF_USERNAME,
        // password: process.env.SF_PASSWORD,
        // token: process.env.SF_TOKEN,
        // host: process.env.SF_HOST,

        logLevel: 'debug' // Set the debug level
      },

      // Setup for the force init task
      init: {
        options: {
          // Setup project
          project: {
            src: './src' // This is the default for the code
          }
        }
      },

      // Setup pull, push, reset tasks (no special options yet)
      pull: {}, push: {}, reset:{}
    }
  });

  // Load the tasks from the npm package
  grunt.loadNpmTasks('grunt-sf-jedi');

  // Default tasks? initialises any non-existing .force folder and pulls metadata
  // from the init.options.project.src package.xml if existing, else copies a default into there
  grunt.registerTask('default',['force:init']);
};
```

To then run any of these tasks, from the project root run `grunt force:<task>`.
For example, to initialize the project folder you would run `grunt force:init`.

## Tasks

### force:init

The `force:init` task will initialize the project folder by creating a `.force` folder.
It will also then create a `.force/src` folder and copy a
standard `package.xml` in.

It is possible to specify an `options` object which provides a `project.src`
setting as shown in the example. This will change `.force/src -> ./your/folder`

### force:pull

The `force:pull` task will pull all the metadata down based off the `package.xml`.
It **will** override local changes in this version so be careful.
In the future that will not be the case.

### force:push

The `force:push` task will push all the meta data up to the org based again off the `package.xml`.
It **will** push ALL files in this version.

### force:reset

The `force:reset` task **will** obliterate the entire `.force/` and `./force/src` (or whatever you set it to) folders.

## Planned Features

The planned features are discussed at the [sf-jedi][sf-jedi] repo.
However, key features coming to list here are:

- Correct file tracking to push or pull in desired changes only
- Watch functionality to auto push saved files
- Clearer messages and configurable options.

## Acknowledgements

- [JSForce][jsforce] - I am using this to retrieve Salesforce data
- [grunt-force-developer][gfd] - I was inspired by this project.

[jsforce]:https://jsforce.github.io/
[grunt-sf-jedi]:https://github.com/lessonteacher/grunt-sf-jedi
[grunt]:http://gruntjs.com/
[sf-jedi]:https://github.com/lessonteacher/sf-jedi
[gfd]:https://github.com/jkentjnr/grunt-force-developer
