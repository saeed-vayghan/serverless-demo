'use strict';

const assert     = require('assert');
const cityPlugin = require('../../../app/plugins/models/city')

const data = require('./data').city

let createdCity


describe('#Testing Vopak-Demo DB Models', function() {
  it('should not be able to create a city record', async function() {
    const clone = JSON.parse(JSON.stringify(data));

    delete clone.query
    const { created, error } = await cityPlugin.createCity(clone);

    assert.equal(created, null);
    assert.equal(error.message, 'City validation failed: query: Path `query` is required.')
  });

  it('should create a city record', async function() {
    const { created, error } = await cityPlugin.createCity(data);

    createdCity = created

    assert.equal(error, null);
    assert.equal(created.query, data.query);
    assert.equal(created.name, data.name);
    assert.deepEqual(created.timeZone, data.timeZone);
  });

  it('should return a city by it\'s name', async function() {
    const { city, error } = await cityPlugin.getCityByName(createdCity.query);

    assert.equal(error, null);
    assert.equal(city.query, createdCity.query);
    assert.equal(city.name, createdCity.name);
  });

  it('should delete a city by id', async function() {
    const result = await cityPlugin.deleteCity(createdCity._id);

    assert.equal(result.error, null);

    const { city, error } = await cityPlugin.getCityByName(createdCity.query);

    assert.equal(city, null);
    assert.equal(error, null);
  });
});