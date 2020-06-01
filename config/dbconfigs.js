'use strict';

const config   = require('.');
const mongoose = require('mongoose');


const connectToDatabase = async () => {
  const options = {
    // user: 'user',
    // pass: 'pass',
    // auth: { authdb: 'db' },
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  const database = await mongoose.connect(config.mongo.uri, options);
  const state    = database.connections[0].readyState;

  return state
};


module.exports = connectToDatabase;