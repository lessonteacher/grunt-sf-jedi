'use strict'

/**
 * TODO: Create separate project for the actual main functionality so that
 * it can be made into command line or otherwise
 */
var Force = require('../lib/force');

/**
 * Module export for the grunt task setup
 *
 * @param grunt - This is grunt as provided by the load[Npm]Tasks function
 */
module.exports = function(grunt) {
  grunt.registerMultiTask('force', 'A suite of grunt tasks for salesforce development', function() {

    // Set the task defaults here
    let defaults = {
      useGit: false,
      username: process.env.SF_USER,
      password: process.env.SF_PASSWORD,
      token: process.env.SF_TOKEN,
      host: process.env.SF_HOST
    }

    // Mixin any provided options
    defaults = this.options(defaults);

    // Create the force object
    let force = new Force(defaults);

    // Call the relevant method
    force[this.target]();
  });
};
