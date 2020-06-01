'use strict';

const cityPlugin    = require('../plugins/models/city')
const weatherPlugin = require('../plugins/models/weather')
const weatherAPIs   = require('../plugins/weather/worldWeather')
const utils         = require('../plugins/utils')



const manipulateCityWeather = async function (city, utc) {
  const weather = await weatherAPIs.weather(city.query);

  const condition = weather.data.current_condition[0]

  condition.tempC = condition.temp_C
  condition.tempF = condition.temp_F

  const weatherData = {
    _city: city._id,
    utc,

    localtime: weather.data.time_zone[0].localtime,
    condition,

    created: new Date()
  };

  const { upserted, error } = await weatherPlugin.upsertWeather(weatherData);

  return {
    upserted,
    error
  }
};

const handleCityWeather = async function (cname) {
  const utc = utils.getUTCKey();

  const { city, error } = await cityPlugin.getCityByName(cname);

  if (error) {
    return {
      error
    }
  }

  if (!city) {
    return {
      error: 'Something wrong in city controllers!'
    }
  }


  const result = await weatherPlugin.getWeatherByCityAndTime(city._id, utc);

  if (result.error) {
    return {
      error: result.error
    }
  }

  if (result.weather) {
    return {
      cityWeather: result.weather
    }
  }


  // console.log('Cached city-weather record not found!');

  const manipulateResult = await manipulateCityWeather(city, utc);

  if (manipulateResult.error) {
    return {
      error: manipulateResult.error
    }
  }

  return {
    cityWeather: manipulateResult.upserted
  }
};


/**
 * @api {get} /api/currentweather/:cname Current weather of a city
 * @apiVersion 1.0.0
 * @apiName processWeather
 * @apiGroup Weather
 * @apiPermission admin
 * 
 * @apiHeader {String} Auth-Token Bearer-Token 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "auth-token:": "my_secure_token",
 *     }
 *
 * @apiDescription Some description about this API
 *
 * @apiParam {String} cname City name
 *
 * @apiExample Example usage: return a minified response
 * curl -XGET  http://localhost/api/currentweather/covilha
 * 
 * @apiExample Example usage: return full response
 * curl -XGET  http://localhost/api/currentweather/covilha?verbose=true
 *
 * @apiSuccess {String}   id            The record id.
 * @apiSuccess {String}   _city         The city it.
 * @apiSuccess {String}   localtime     Localtime
 * @apiSuccess {String}   utc           The exact UTC time in format of YYYMMDDHM
 * @apiSuccess {Object}   condition     Weather condition object
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        '_id': '5ed36500c62577e423e33a83',
 *        '_city': '5ed26e0b1d567b579e9107cc',
 *        'utc': 202053184,
 *        'localtime': '2020-05-31 09:00',
 *        'condition': {
 *          'weatherIconUrl': [],
 *          'weatherDesc': [{ 'value': 'Light rain shower' }],
 *          'weatherCode': 353,
 *          'windspeedMiles': 1,
 *          'windspeedKmph': 2,
 *          'winddirDegree': 1,
 *          'humidity': 79,
 *          'visibility': 10,
 *          'visibilityMiles': 6,
 *          'pressure': 1010,
 *          'pressureInches': 30,
 *          'cloudcover': 87,
 *          'FeelsLikeC': 15,
 *          'FeelsLikeF': 58,
 *          'uvIndex': 7,
 *          'tempC': 15,
 *          'tempF': 58
 *        },
 *        'created': '2020-05-31T08:04:16.420Z'
 *      }
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 403 Not Allowed
 *     {
 *       'error': 'Access is not allowed!'
 *     }
 */
const processWeather = async function (req, res, next) {
  const cname = req.params.cname;

  const { error, cityWeather } = await handleCityWeather(cname);

  if (error) {
    return res.status(400).json({ error })
  }

  return res.json(cityWeather)
};

const processCovilha = async function (req, res, next) {
  const cname = 'covilha';

  const { error, cityWeather } = await handleCityWeather(cname);

  if (error) {
    return res.status(400).json({ error })
  }

  if (req.query.verbose) {
    return res.json(cityWeather)
  }

  return res.json({
    localtime: cityWeather.localtime,
    tempC: cityWeather.condition.tempC,
    tempF: cityWeather.condition.tempF
  })
};



module.exports = {
  processWeather,
  processCovilha
}