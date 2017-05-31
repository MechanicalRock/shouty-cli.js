'use strict';

const expect = require('chai').expect
const pact=require('@pact-foundation/pact-node')
var request = require('superagent')


var PactOpts = {
  consumer: 'shoutyClient',       // the name of your consumer
  provider: 'Shouty',             // the name of your Provider
  providerPort: 1234              // the port on which the provider runs
}

PactConsumer(PactOpts, function () {

  // this is wrapped in a before() block
  // it takes an Array of interactions
  addInteractions([{
    state: 'i am not logged in',
    uponReceiving: 'a login request',
    withRequest: {
      method: 'post',
      path: '/login',
      headers: { 'Accept': 'application/json' }
      body: { name: 'jeff', x:0, y:100 }
    },
    willRespondWith: {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: { listenQueue: 'https://sqs.us-east-1.amazonaws.com/123456789012/aa4-MyQueue-Z5NOSZO2PZE9' }
    }
  }])

  function login () {
    return request.get('http://localhost:' + PactOpts.providerPort + '/login')
      .set({ 'Accept': 'application/json' })
      .send({ name: 'jeff', x:0, y:100 })
  }

  // this is your 'it' block
  verify('the listen queue is returned', login, function (result, done) {
    expect(JSON.parse(result)).to.eql({ listenQueue: 'https://sqs.us-east-1.amazonaws.com/123456789012/aa4-MyQueue-Z5NOSZO2PZE9' })
    done()
  })

  // this is wrapped in a after block
  // thus it runs after all your verify's
  // it writes the pact and clear all interactions
  finalizePact()

})
