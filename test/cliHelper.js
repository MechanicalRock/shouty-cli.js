'use strict';
const execSync = require('child_process').execSync;

module.exports= {
  command: (cmdline) => {
    return execSync(cmdline).toString('utf8')
  }
}
