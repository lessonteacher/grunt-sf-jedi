'use strict';

require('dotenv').config();

module.exports = function(grunt) {

  grunt.initConfig({

    // Set the default config stuff
    force: {
      options: {
        //=============================================================
        // All of these are set in my .env in the project root folder and
        // I am using 'dotenv' package to load them
        //=============================================================
        // username: process.env.SF_USERNAME,
        // password: process.env.SF_PASSWORD,
        // token: process.env.SF_TOKEN,
        // host: process.env.SF_HOST,

        pollTimeout:60000, // Time in ms for jsforce retrieve / deploy
        pollInterval:1000, // Time between polls in ms for jsforce
        logging: {
          level: 'debug' // Set log output level
        }
      },

      init: {
        options: {
          project: {
            src: './src', // Where the files will go (do not leave a trailing /)
            pullOnInit: false, // Set this true if you want to pull after initialising
            createMetaXml: true, // True if you want missing -meta.xml to be created

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
      },

      pull: {
        options: {
          // You can set these per Pull, Push or globaly
          pollTimeout: 120000, // Same as the global
          pollInterval: 1000   // Same as the global
        }
      },

      push: {
        options: {
          pollTimeout: 240000, // Yes you can set these again

          // A random selection from salesforce docs
          allowMissingFiles: true,
          runTests:['some_test','some_other_test']
        }
      },

      reset: {
        options: {
          deleteSrcOnReset: false // Set to false if you dont want the src folder to be reset
        }
      }
    }
  });

  grunt.loadTasks('grunt-sf-jedi');
  grunt.registerTask('default',['force:init']);
};
