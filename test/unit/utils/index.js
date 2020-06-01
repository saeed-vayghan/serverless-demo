'use strict';

const assert = require('assert');
const utils  = require('../../../app/plugins/utils')



describe('#Testing Vopak-Demo Utilities', function() {
  it('should return a correct key for a specific date', async function() {
    const todayKey = 202012151813
    const today    = new Date('2020-12-15')

    today.setUTCHours(18)
    today.setUTCMinutes(13)
    today.setUTCMilliseconds(0)

    const key = utils.getUTCKey(today)

    assert.equal(todayKey, key);
  });
});