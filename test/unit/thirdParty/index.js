'use strict';

const assert      = require('assert');
const weatherAPIs = require('../../../app/plugins/weather/worldWeather');

const amsterdam = [{ type: 'City', query: 'Amsterdam, Netherlands' }];



describe('#Testing Vopak-Demo Third-Part APIs', function() {
  it('should fetch valid information from weather endpoint', async function() {
    const result = await weatherAPIs.weather('Amsterdam')
    assert.deepEqual(result.data.request, amsterdam);
  });

  it('should fetch valid information from weather endpoint', async function() {
    const result = await weatherAPIs.monthly('Amsterdam')
    assert.deepEqual(result.data.request, amsterdam);
  });
});