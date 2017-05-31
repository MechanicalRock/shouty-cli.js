'use strict';
const escapeJSON = require('escape-json-node');
const fs = require('fs')


class Config {
  constructor(endpoint){
    this.endpoint=endpoint
  }

  save(dest){
    var config={
      endpoint: this.endpoint || '',
      listenQueue: this.listenQueue || undefined,
      name: this.name || undefined
    }

    var fs = require('fs');
    fs.writeFileSync(dest, JSON.stringify(config));
  }

  setListenQueue(queue){
    this.listenQueue=queue
  }

  setName(name){
    this.name=name
  }

  static load(src){
    var config = JSON.parse(fs.readFileSync(src))
    var cfg = new Config(config.endpoint)

    if(config.name){
      cfg.setName(config.name)
    }

    if(config.listenQueue){
      cfg.setListenQueue(config.listenQueue)
    }
    return cfg
  }
}

module.exports=Config
