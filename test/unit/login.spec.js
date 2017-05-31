'use strict';
const chai = require('chai')
const expect = chai.expect;
const execSync = require('child_process').execSync;
const packageJson = require('../../package')
const path = require('path');
const fs = require('fs');
// const command=require('../cliHelper').command
const sinon=require('sinon')
const shoutyClient = require('../../src/shoutyClient')
const vm = require('vm')

const shouty=require('../../src/cli').shouty

function cli(args){
  //Prepend extra args expected by commander
  const nodeExe='node'
  const scriptName='shouty'
  var cliArgs = [nodeExe,scriptName].concat(args)
  shouty(cliArgs)
}

describe('CLI', ()=> {

  before( ()=> {
    this.spy = sinon.stub(shoutyClient,'login')
    cli(['configure', 'http://localhost:8080'])
  });

  describe('login', () =>{

    it('should login', ()=> {

      cli(['login', 'Jeff', '0', '100'])
      expect(this.spy.calledWithExactly('http://localhost:8080','Jeff','0','100')).to.equal(true)
    });

  });
  
  after( ()=> {
    shoutyClient.login.restore()
  });

})
