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
  const configFile = path.join(require('os').homedir(), ".shouty.json")

  before( ()=> {
    this.spy = sinon.stub(shoutyClient,'shout')
  });

  describe('shout', () =>{

    describe('when logged in', ()=> {
      before(()=>{
        var config={
          endpoint: "http://localhost:9090",
          name: "Jeff"
        }
        fs.writeFileSync(configFile, JSON.stringify(config));
      });

      it('should shout a message', ()=> {
        cli(['shout', "Free bagels!"])
        expect(this.spy.called).to.equal(true)
        expect(this.spy.calledWithExactly("http://localhost:9090","Jeff", "Free bagels!")).to.equal(true)
      });
    });

    describe('when not logged in',()=>{

      before(()=>{
        var config={
          endpoint: "http://localhost:9090",
        }
        fs.writeFileSync(configFile, JSON.stringify(config));
      });

      it('should throw error', ()=> {
        expect( ()=>{cli(['shout', "Free bagels!"])} ).to.throw('Not logged in')
      });

    });

  });

  after( ()=> {
    shoutyClient.shout.restore()
  });

})
