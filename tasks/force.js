'use strict'

var Force = require('sf-jedi');

/**
 * Module export for the grunt task setup
 * @param grunt - This is grunt as provided by the load[Npm]Tasks function
 */
module.exports = function(grunt) {
  grunt.registerMultiTask('force', 'A suite of grunt tasks for salesforce development', function() {
    // Set the defaults
    let defaults = this.options();

    // Create the force object
    try {
      let force = new Force(defaults);

      // All the force tasks are async
      let done = this.async();

      // Call the relevant method
      force[this.target]()
        .then(result => done())
        .catch(err => {
          grunt.log.writeln(err);
          done();
        });
    } catch (e) {
      grunt.log.error(e);
    }
  });
};
