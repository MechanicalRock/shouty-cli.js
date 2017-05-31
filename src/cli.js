'use strict';
const cli = require('commander');
const packageInfo = require('../package')
const shoutyClient = require('./shoutyClient')
const fs=require('fs')
const Config = require('./config')

module.exports={

  shouty: (argv)=> {
    const homedir = require('os').homedir()
    const configFile = `${homedir}/.shouty.json`

    cli
    .version(packageInfo.version)
    .description('Shouty Command Line')
    .action( () => {
      console.log('root')
    });

    cli
    .command('configure <endpoint>')
    .description('Configure the shouty CLI')
    .action( (endpoint)=> {

      var config = new Config(endpoint)
      config.save(configFile)

    });

    cli
    .command('login <name> <x> <y>')
    .description('Login to shouty with the given name and co-ordinates')
    .action((name,x,y) => {
      const homedir = require('os').homedir()
      const endpoint = Config.load(configFile).endpoint
      shoutyClient.login(endpoint,name,x,y)
      console.log(`logged in with ${endpoint} ${name} ${x} ${y}`)
    });

    cli.command('shout <msg>')
    .description("Shout a message")
    .action((msg) => {
      var config = Config.load(configFile)
      if(!config.name){
        throw new Error('Not logged in')
      }
      shoutyClient.shout(config.endpoint,config.name,msg)
    })

    cli.parse(argv);

    if (!argv.slice(2).length) {
      cli.outputHelp();
    }

  }
}
