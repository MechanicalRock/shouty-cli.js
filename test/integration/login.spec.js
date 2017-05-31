'use strict';
const chai = require('chai')
const expect = chai.expect;
const execSync = require('child_process').execSync;
const packageJson = require('../../package')
const path = require('path');
const fs = require('fs');
const command=require('../cliHelper').command

describe('login', ()=> {
  const shoutyExec='shouty'
  const configure=`${shoutyExec} configure`
  const login=`${shoutyExec} login`

  before(() => {
    command(`${configure} http://localhost:8080`)
  });

  it("should require the name and (x,y) location", () => {
    expect(() => {command(login)}).to.throw('missing required argument `name\'')
    expect(() => {command(`${login} foo`)}).to.throw('missing required argument `x\'')
    expect(() => {command(`${login} foo 0`)}).to.throw('missing required argument `y\'')
  });



});
