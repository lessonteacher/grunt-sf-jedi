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

      // Setup pull, push, clean tasks (no special options yet)
      pull: {}, push: {}, clean:{}
    }
  });

  // Usage from cli
  // grunt force:init
  // grunt force:pull
  // grunt force:push
  // grunt force:clean <--- Obliterates everything right now so watch out

  grunt.loadNpmTasks('grunt-sf-jedi');

  // Default tasks? initialises any non-existing .force folder and pulls metadata
  // from the init.options.project.src package.xml if existing, else copies a default into there
  grunt.registerTask('default',['force:init']);
};
