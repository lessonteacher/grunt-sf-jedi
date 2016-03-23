'use strict'

var fs = require('fs-promise');

/** Initializes a .force project by looking for the .force folder and if it
 * doesnt exist it creates the folder and config.
 */
class Initializer {
  constructor(force) {
    this.force = force;
    this.project = force.options.project;
  }

  /** Initializes force project */
  init() {
    // If new then do initial folder setup
    if(this._isNew()) this.setup();

    // Pull base metadata
    this.force.pull();

    // Set the project settings?
    // if(this.project)
  }

  /** Creates .force and config */
  setup() {
    this._setupDirs().then(this._setupFiles());
  }

  // Creates the base directories
  _setupDirs() {
    let root = this.forceDir;
    let changes = `${root}/changes`;
    let pkg = `${root}/package`;

    return Promise.all([
      fs.mkdir(root),
      fs.mkdir(changes),
      fs.mkdir(pkg)
    ]);
  }

  // Creates the files inside the base directories
  _setupFiles() {
    // return Promise.all([
    //   // .force/changes/log ?
    //   // .force/package/package.xml
    //   // .force/project.json
    // ]);
  }

  // Check if .force exists
  _isNew() {
    return !fs.existsSync(this.forceDir);
  }

  get forceDir() { return [this.force.rootDir,'.force'].join('/'); }

}

module.exports = Initializer;
