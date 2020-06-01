'use strict';

const config  = require('../../../config');
const request = require('request-promise-native');

const API_KEY = config.worldWeather.key


// Paris, Texas and Paris, France
const weather = async (city) => {
  const params = `&q=${city}&showlocaltime=yes&fx=no&cc=yes&mca=no&format=json`
  const url    = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}${params}`

  const response = await request.get({ url })

  return JSON.parse(response)
}

const monthly = async (city) => {
  const params = `&q=${city}&num_of_days=1&format=json`
  const url    = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}${params}`

  const response = await request.get({ url })

  return JSON.parse(response)
}


module.exports = {
  weather,
  monthly
}