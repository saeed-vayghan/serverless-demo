'use strict';

const sanitize = require('../utils/sanitizer');
const mongoose = require('mongoose');

const Weather  = mongoose.model('Weather');



const upsertWeather = async function (weather) {
  let error    = null;
  let upserted = null;

  try {
    const result = await Weather.updateOne({ _city: weather._city, utc: weather.utc }, { $set: sanitize(weather) }, { upsert: true })
    upserted = await Weather.findById(result.upserted[0]._id);
  } catch (ex) {
    error = ex;
  }

  return {
    upserted,
    error
  }
};

const getWeatherByCityAndTime = async function (_city, utc) {
  let error  = null;
  let weather   = null;

  try {
    weather = await Weather.findOne({ _city, utc });
  } catch (ex) {
    error = ex;
  }

  return {
    weather,
    error
  }
};

const deleteWeather = async function (_id) {
  let error = null;

  try {
    await Weather.deleteOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    error
  };
};


module.exports = {
  upsertWeather,
  getWeatherByCityAndTime,
  deleteWeather
}