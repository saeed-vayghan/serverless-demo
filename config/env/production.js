'use strict';

module.exports = {
  mongo: {
    uri: process.env.MONGODB_URL_PRO
  },

  openWeather: {
    key: process.env.OPEN_WEATHER_KEY
  },

  worldWeather: {
    key: process.env.WORLD_WEATHER_KEY
  },

  authToken: process.env.AUTH_TOKEN
}