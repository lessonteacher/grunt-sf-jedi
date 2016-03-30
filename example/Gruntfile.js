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

        // Set the autoPull setting, default is false
        // autoPull: true,

        // Sets the output to be more verbose, uses winston logging levels
        logLevel: 'debug' // Default is 'info'
      },

      // Setup for the force init task
      init: {
        options: {
          // Setup project
          project: {
            src: './src' // Set a custom source folder
          }
        }
      },

      // Setup pull, push, reset tasks (no special options yet)
      pull: {}, push: {}, reset:{}
    }
  });

  // Usage from cli
  // grunt force:init
  // grunt force:pull
  // grunt force:push
  // grunt force:reset <--- Obliterates everything right now so watch out

  grunt.loadNpmTasks('grunt-sf-jedi');

  // Default tasks? initialises any non-existing .force folder and pulls metadata
  // from the init.options.project.src package.xml if existing, else copies a default into there
  grunt.registerTask('default',['force:init']);
};
