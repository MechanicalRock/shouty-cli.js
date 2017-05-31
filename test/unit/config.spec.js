'use strict';
const Config = require('../../src/config');
const chai = require('chai')
chai.use(require('chai-fs'))
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

describe('config', ()=> {
  const configFile = path.join(process.cwd(), ".shouty.json")
  const endpoint="http://localhost:8080/"

  describe('constructor',()=>{

    it("should set the endpoint if defined", ()=>{
      const cfg = new Config(endpoint)
      expect(cfg.endpoint).to.equal(endpoint)
    });
  });

  describe('#load', ()=> {
    beforeEach(()=>{
      var config={
        endpoint: "http://localhost:9090",
        name: "Jeff",
        listenQueue: "http://localhost:1234/12345/myQueue"
      }
      fs.writeFileSync(configFile, JSON.stringify(config));


      this.config = Config.load(configFile)
    });

    it('should load the config', ()=>{
        expect(this.config).not.to.be.undefined
        expect(this.config.endpoint).to.equal("http://localhost:9090")
    });

    it('should set the name if defined', ()=> {
      expect(this.config.name).not.to.be.undefined
      expect(this.config.name).to.equal("Jeff")
    })

    it('should set the listenQueue if defined', ()=>{
      expect(this.config.listenQueue).not.to.be.undefined
      expect(this.config.listenQueue).to.equal("http://localhost:1234/12345/myQueue")
    })
  });

  describe('#setListenQueue', ()=> {
    it('should set the listen queue', ()=>{
      const cfg = new Config(endpoint)
      const listenQueue="http://localhost:1234/12345/myQueue"
      cfg.setListenQueue(listenQueue)

      expect(cfg.listenQueue).to.equal(listenQueue)
    })
  });

  describe('#setName', ()=> {
    it('should set the name', ()=>{
      const cfg = new Config(endpoint)
      const name="Joe"
      cfg.setName(name)

      expect(cfg.name).to.equal(name)
    })
  });

  describe('#save', ()=> {
    const endpoint="http://localhost:8080/"

    beforeEach(()=>{
      this.cfg = new Config(endpoint)
      this.cfg.save(configFile)
    });

    it("should create a config file in the users home directory", () => {
      expect(process.cwd()).to.be.a.directory().and.include.files(['.shouty.json'])
    });

    it("should set the endpoint to use", ()=> {
      expect(JSON.parse(fs.readFileSync(configFile)).endpoint).to.equal(endpoint)
    });

    it("should not set the listen queue when not defined", ()=> {
      expect(JSON.parse(fs.readFileSync(configFile)).listenQueue).to.be.undefined
    });

    it("should set the listen queue if defined", ()=> {
      const listenQueue="http://localhost:1234/12345/myQueue"
      this.cfg.setListenQueue(listenQueue)

      this.cfg.save(configFile)

      expect(JSON.parse(fs.readFileSync(configFile)).listenQueue).to.equal(listenQueue)
    });

    it("should not set the name when not defined", ()=> {
      expect(JSON.parse(fs.readFileSync(configFile)).name).to.be.undefined
    });

    it("should set the name if defined", ()=>{
      this.cfg.setName("Joe")
      this.cfg.save(configFile)
      expect(JSON.parse(fs.readFileSync(configFile)).name).to.equal("Joe")
    })


    after(()=> {
      if(fs.existsSync(configFile)){
        fs.unlinkSync(configFile)
      }
    });

  });
});
