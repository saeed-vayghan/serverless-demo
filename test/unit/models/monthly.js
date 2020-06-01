'use strict';

const assert        = require('assert');
const cityPlugin    = require('../../../app/plugins/models/city')
const monthlyPlugin = require('../../../app/plugins/models/monthly')

const cdata = require('./data').city
const mdata = require('./data').monthly

let createdCity
let upsertedMonthly


describe('#Testing Vopak-Demo DB Models', function() {
  it('should create a monthly record', async function() {
    const cityResult = await cityPlugin.createCity(cdata);
    createdCity = cityResult.created
    assert.equal(cityResult.error, null);

    const clone = JSON.parse(JSON.stringify(mdata));
    clone._city = createdCity._id
    const { upserted, error } = await monthlyPlugin.upsertMonthly(clone);
    upsertedMonthly = upserted

    assert.equal(error, null);
    assert.equal(upserted._city.toString(), clone._city.toString());
    assert.equal(upserted.utc, clone.utc);
  });

  it('should return a monthly by city and utc', async function() {
    const { record } = await monthlyPlugin.getMonthlyByCityAndTime(upsertedMonthly._city, upsertedMonthly.year, upsertedMonthly.month);

    assert.equal(upsertedMonthly._city.toString(), record._city.toString());
    assert.equal(upsertedMonthly.utc, record.utc);
  });

  it('should delete a monthly by id', async function() {
    const result = await cityPlugin.deleteCity(createdCity._id);
    assert.equal(result.error, null);

    const { error } = await monthlyPlugin.deleteMonthly(upsertedMonthly._id);
    assert.equal(error, null);

    const { monthly } = await monthlyPlugin.getMonthlyByCityAndTime(upsertedMonthly._city, upsertedMonthly.year, upsertedMonthly.month);
    assert.equal(monthly, null);
  });
});