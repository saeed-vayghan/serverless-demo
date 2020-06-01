'use strict';

const express    = require('express');
const app        = express();

// Might be used later
// const bodyParser = require('body-parser');
// const helmet = require('helmet');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());

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