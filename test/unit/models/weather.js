'use strict';

const assert        = require('assert');
const cityPlugin    = require('../../../app/plugins/models/city')
const weatherPlugin = require('../../../app/plugins/models/weather')

const cdata = require('./data').city
const wdata = require('./data').weather

let createdCity
let upsertedWeather


describe('#Testing Vopak-Demo DB Models', function() {
  it('should create a weather record', async function() {
    const cityResult = await cityPlugin.createCity(cdata);
    createdCity = cityResult.created
    assert.equal(cityResult.error, null);

    const clone = JSON.parse(JSON.stringify(wdata));
    clone._city = createdCity._id
    const { upserted, error } = await weatherPlugin.upsertWeather(clone);
    upsertedWeather = upserted

    assert.equal(error, null);
    assert.equal(upserted._city.toString(), clone._city.toString());
    assert.equal(upserted.utc, clone.utc);
  });

  it('should return a weather by city and utc', async function() {
    const { weather } = await weatherPlugin.getWeatherByCityAndTime(upsertedWeather._city, upsertedWeather.utc);

    assert.equal(upsertedWeather._city.toString(), weather._city.toString());
    assert.equal(upsertedWeather.utc, weather.utc);
  });

  it('should delete a weather by id', async function() {
    const result = await cityPlugin.deleteCity(createdCity._id);
    assert.equal(result.error, null);


    const { error } = await weatherPlugin.deleteWeather(upsertedWeather._id);
    assert.equal(error, null);

    const { weather } = await weatherPlugin.getWeatherByCityAndTime(upsertedWeather._city, upsertedWeather.utc);
    assert.equal(weather, null);
  });
});