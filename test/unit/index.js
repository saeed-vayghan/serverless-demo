'use strict';

require('dotenv').config();
require('../../config')

// connect to db
require('../../config/dbconfigs')();

// inject models
require('../../app/models/city');
require('../../app/models/weather');
require('../../app/models/monthly');


describe('DB Models', () => {
  require('./models/city');
  require('./models/weather');
  require('./models/monthly');
});

describe('Thirdpart Plugins', () => {
  require('./thirdParty');
});

describe('Utilities', () => {
  require('./utils');
});