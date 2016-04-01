# Grunt SF Jedi

>A set of [`grunt`][grunt] tasks for the [`sf-jedi`][sf-jedi] package.
if you are not familiar with grunt then you can take a look
through the provided link

_The tasks allow you to `deploy` and `retrieve` from Salesforce. See the linked [sf-jedi repo][sf-jedi] for more details..._

## Install

[![NPM](https://nodei.co/npm/grunt-sf-jedi.png?downloads=true)](https://nodei.co/npm/grunt-sf-jedi/)

If you dont have `grunt` install the grunt-cli via

```sh
npm install -g grunt-cli
```

Install these grunt tasks and add to dev dependencies  with

```sh
npm install grunt-sf-jedi --save-dev
```

## Usage  

You need a `Gruntfile.js` in your project root so here is
a very simple example one:

```javascript
'use strict';

// I use this to load a .env file with the SF_* vars, it is optional
require('dotenv').config();

// This is an example file of some Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // Set the base force object
    force: {
      // Set some global options
      options: {
        //=============================================================
        // All of these are set in my .env in the project root folder and
        // I am using 'dotenv' package to load them
        //=============================================================
        // username: process.env.SF_USERNAME,
        // password: process.env.SF_PASSWORD,
        // token: process.env.SF_TOKEN,
        // host: process.env.SF_HOST,
      },

      // Define all the tasks with NO options
      init: {}, pull: {}, push: {}, reset:{}
    }
  });

  // Load the tasks from the npm package
  grunt.loadNpmTasks('grunt-sf-jedi');

  // Default tasks? these run on 'grunt' with no command
  grunt.registerTask('default',['force:init']);
};
```

To then run any of these tasks, from the project root run `grunt force:<task>`.
For example, to initialize the project folder you would run `grunt force:init`.

## Tasks

As shown in the example above you can set options on the `force.options` object. However, every task can have an options object as well and they will all be mixed into one full options definition.

For each example I will provide just the object, with the options. You should just use the options not the whole snippet as it obviously wont be complete. Here are some global options (though, all options can be set globally)

```javascript
force: {
  options: {
    pollTimeout:60000, // Time in ms for jsforce retrieve / deploy
    pollInterval:1000, // Time between polls in ms for jsforce
    logging: {
      level: 'debug' // Set log output level
    }
  }
}
```

### force:init

The `force:init` task will initialize the project folder by creating a `.force` folder.

Here are some options you might want to set on init. Usually the 'src' is set but if you want you can set any of these, even changing the package.xml here.

```javascript
init: {
  options: {
    project: {
      src: './src', // Where the files will go (do not leave a trailing /)
      pullOnInit: false, // Set this true if you want to pull after initialising
      createMetaXml: true, // True if you want missing -meta.xml to be created
      deleteSrcOnReset: true, // Set to false if you dont want the src folder to be reset

      // You can set the whole package.xml, this is the default(which is set for you)
      package: {
        types: [
          { members: '*', name: 'ApexClass' },
          { members: '*', name: 'ApexComponent' },
          { members: '*', name: 'ApexPage' },
          { members: '*', name: 'ApexTrigger' },
          { members: '*', name: 'StaticResource' }
        ],
        version: '34.0' // if you change THIS version it will be used
      }
    }
  }
}
```

### force:pull

The `force:pull` task will pull all the metadata down based off the `package` definition.

You might find inconsistencies if you are setting the package as above in `init` but then you change the retrieved `package.xml`. In a later `sf-jedi` version that wont be a problem but take note of that for now.

Here is an example with some options

```javascript
pull: {
  options: {
    // You can set these per Pull, Push or globaly
    pollTimeout: 120000, // Same as the global
    pollInterval: 1000   // Same as the global
  }
}
```

_This **will** override local changes in this version so be careful.
In the future that will not be the case._

### force:push

The `force:push` task will push all the meta data up to the org based again off the `package` definition.

Here is an example for push, note that there are a lot of options that you can set if you look at [the salesforce reference][sf-deploy] you can provide all of those

```javascript
push: {
  options: {
    pollTimeout: 240000, // Yes you can set these again

    // A random selection from salesforce docs
    allowMissingFiles: true,
    runTests:['some_test','some_other_test']
  }
}
```

_It **will** push ALL files until a later sf-jedi version_

### force:reset

The `force:reset` task **will** obliterate the entire `.force/` folder and potentially the `src` folder unless configured with an option. Here is an example

```javascript
reset:{
  options: {
    deleteSrcOnReset: false, // Set to false if you dont want the src folder to be reset
  }
}
```

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
[sf-deploy]:https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy.htm#deploy_options
