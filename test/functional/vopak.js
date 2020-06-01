'use strict';

const config = require('../../config');

const mochaPlugin = require('serverless-mocha-plugin');
const expect      = mochaPlugin.chai.expect;

const wrapped = mochaPlugin.getWrapper('vopak', '/index.js', 'handler');


describe('vopak', () => {
  before((done) => {
    done();
  });

  it('Unauthorized Access', async () => {
    const event = {
      httpMethod: 'get',
      path: '/api/foo'
    };

    const response = await wrapped.run(event);

    expect(response.statusCode).to.be.equal(403);
    expect(JSON.parse(response.body).error).to.be.equal('Access is not allowed!');
  });

  it('/info', async () => {
    const event = {
      httpMethod: 'get',
      path: '/info'
    };

    const response = await wrapped.run(event);

    expect(response.statusCode).to.be.equal(200);
    expect(JSON.parse(response.body).message).to.be.equal('Welcome to the API server!!');
  });

  it('/api/currenttempincovilha', async () => {
    const event = {
      httpMethod: 'get',
      path: '/api/currenttempincovilha',
      headers: {
        'auth-token': config.authToken
      }
    };

    const response = await wrapped.run(event);
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).to.be.equal(200);
    expect(responseBody.tempC).to.be.not.null;
  });

  it('/api/avgtempinsfax', async () => {
    const event = {
      httpMethod: 'get',
      path: '/api/avgtempinsfax',
      headers: {
        'auth-token': config.authToken
      }
    };

    const response = await wrapped.run(event);
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).to.be.equal(200);
    expect(responseBody.month).to.be.not.null;
    expect(responseBody.absMaxTemp).to.be.not.null;
  });

  it('/api/currentweather/:cname', async () => {
    const event = {
      httpMethod: 'get',
      path: '/api/currentweather/tehran',
      headers: {
        'auth-token': config.authToken
      },
      // pathParameters: { cname: 'tehran' },
      // queryStringParameters: {a: "first",b:"second"}
      // body: {}
    };

    const response = await wrapped.run(event);
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).to.be.equal(200);
    expect(responseBody.localtime).to.be.not.null;
  });

  it('/api/avgtemp/:cname/:month', async () => {
    const event = {
      httpMethod: 'get',
      path: '/api/avgtemp/tehran/12',
      headers: {
        'auth-token': config.authToken
      }
      // pathParameters: { cname: 'tehran' },
      // queryStringParameters: {a: "first",b:"second"}
      // body: {}
    };

    const response = await wrapped.run(event);
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).to.be.equal(200);
    expect(responseBody.name).to.be.equal('December');
  });
});