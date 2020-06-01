'use strict';

const serverless = require('serverless-http');

require('dotenv').config();
require('./config')

const app = require('./config/express.core');

// app.listen(3000, () => console.log('Listening on: 3000'));

module.exports.handler = serverless(app);

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  process.exit(1);
});