'use strict';

const cityPlugin  = require('../plugins/models/city')
const weatherAPIs = require('../plugins/weather/worldWeather')



const handleCity = async function (cname) {
  const { city, error } = await cityPlugin.getCityByName(cname);

  if (error) {
    return {
      error
    }
  }

  if (!city) {
    const weatherInfo = await weatherAPIs.weather(cname);

    const data = {
      query: cname,
      name: weatherInfo.data.request[0].query,
      timeZone: {
        utcOffset: weatherInfo.data.time_zone[0].utcOffset,
        zone: weatherInfo.data.time_zone[0].zone,
      },
      status: true,
    };

    const { created, error } = await cityPlugin.createCity(data);

    if (error) {
      return {
        error
      }
    }

    return {
      city: created
    }
  }

  return {
    city
  }
};


const processCity = async function (req, res, next) {
  const cname = req.params.cname;

  const { error } = await handleCity(cname);

  if (error) {
    return res.status(400).json({ error })
  }

  next();
};

const processCovilha = async function (req, res, next) {
  const cname = 'covilha';

  const { error } = await handleCity(cname);

  if (error) {
    return res.status(400).json({ error })
  }

  next();
};



module.exports = {
  processCity,
  processCovilha
}