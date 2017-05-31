'use strict';
const chai = require('chai')
chai.use(require('chai-fs'))
const expect = chai.expect;
const packageJson = require('../../package')
const path = require('path');
const fs = require('fs');
const command=require('../cliHelper').command

// function command(cmdline) {
//   return execSync(cmdline).toString('utf8')
// }

describe('shouty', () => {
  const endpoint = 'http://localhost:8080'
  const shoutyExec = 'shouty'
  const configure=`${shoutyExec} configure ${endpoint}`
  const login=`${shoutyExec} login`

  it("should print the help", () => {
    expect(command(`${shoutyExec} -h`)).to.have.string('Shouty Command Line')
  });

  it("should print the version", () => {
    expect(command(`${shoutyExec} --version`)).to.have.string(packageJson.version)
  });

  it("should print the help by default", ()=>{
    expect(command(`${shoutyExec}`)).to.have.string("Usage:")
  });

  describe('configure', ()=>{
    const configFile = path.join(require('os').homedir(), ".shouty.json")

    it("should create a config file in the users home directory", () => {
      command(configure)

      expect(require('os').homedir()).to.be.a.directory().and.include.files(['.shouty.json'])
    });

    it("should set the endpoint to use", ()=> {
      command(configure)

      expect(JSON.parse(fs.readFileSync(configFile)).endpoint).to.equal(endpoint)
    });

    afterEach(()=> {
      if(fs.existsSync(configFile)){
        fs.unlinkSync(configFile)
      }
    });


  });

});
