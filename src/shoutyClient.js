'use strict';

const os = require('os')
const http = require('request-promise')

module.exports = {
  login: (endpoint, name,x,y) => {
    const uri=`${endpoint}/login`
    http({
      method: 'POST',
      uri,
      headers: {
      },
      body: {
        name: name,
        x: x,
        y: y
      },
      json: true,
    });
  },

  shout: (endpoint,name,message) => {
    const uri=`${endpoint}/shout`
    http({
      method: 'POST',
      uri,
      headers: {
      },
      body: {
        name: name,
        message: message
      },
      json: true,
    });
  }

}
