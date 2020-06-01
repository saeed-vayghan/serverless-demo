'use strict';

const config  = require('../../../config');
const request = require('request-promise-native');

const API_KEY = config.openWeather.key



const weather = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  return await request.get({ url })
}

const forecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`

  return await request.get({ url })
}



module.exports = {
  weather,
  forecast
}