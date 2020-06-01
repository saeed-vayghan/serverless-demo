'use strict';

const _ = require('lodash');

console.log(`Application is using the ${process.env.NODE_ENV} environment.`);


module.exports = _.extend(
  require('./env/all'),
  require(`./env/${process.env.NODE_ENV}.js`) || {}
);