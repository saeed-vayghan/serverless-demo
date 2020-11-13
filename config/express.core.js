'use strict';

const express    = require('express');
const app        = express();

// Might be used later
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const hsts = require('hsts');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(hsts({ maxAge: 15552000 })); // 180 days in seconds

app.disable('x-powered-by');
app.set('showStackError', true);


// connect to db
require('./dbconfigs')();

// inject models
require('../app/models/city');
require('../app/models/weather');
require('../app/models/monthly');

// inject routes
require('../app/routes/core')(app);


module.exports = app;
