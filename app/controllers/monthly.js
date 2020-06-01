'use strict';

const cityPlugin    = require('../plugins/models/city')
const monthlyPlugin = require('../plugins/models/monthly')
const weatherAPIs   = require('../plugins/weather/worldWeather')



const manipulateCityWeather = async function (city, year, month) {
  const weather = await weatherAPIs.monthly(city.query);

  const records     = weather.data.ClimateAverages[0].month;
  const targetMonth = records[Number(month) - 1];

  const data = {
    _city: city._id,
    year,
    month,

    name: targetMonth.name,
    avgMinTemp: targetMonth.avgMinTemp,
    avgMinTempF: targetMonth.avgMinTemp_F,
    absMaxTemp: targetMonth.absMaxTemp,
    absMaxTempF: targetMonth.absMaxTemp_F,
    avgDailyRainfall: targetMonth.avgDailyRainfall,

    created: new Date()
  };

  const { upserted, error } = await monthlyPlugin.upsertMonthly(data);

  return {
    upserted,
    error
  }
};

const handleMonthlyRecords = async function (cname, year, month) {
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


  const result = await monthlyPlugin.getMonthlyByCityAndTime(city._id, year, month);

  if (result.error) {
    return {
      error: result.error
    }
  }

  if (result.record) {
    return {
      monthly: result.record
    }
  }


  // console.log('Cached monthly record not found!');

  const manipulateResult = await manipulateCityWeather(city, year, month);

  if (manipulateResult.error) {
    return {
      error: manipulateResult.error
    }
  }

  return {
    monthly: manipulateResult.upserted
  }
};


/**
 * @api {get} /api/avgtemp/:cname/:month Monthly report of a city
 * @apiVersion 1.0.0
 * @apiName processMonthly
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
 * @apiParam {Number="1","2","3",...,"12"} month Month Number
 *
 * @apiExample Example usage: return a minified response
 * curl -XGET  http://localhost/api/avgtemp/amsterdam/12
 * 
 * @apiExample Example usage: return full response
 * curl -XGET  http://localhost/api/avgtemp/amsterdam/12?verbose=true
 *
 * @apiSuccess {String}   id          The record id.
 * @apiSuccess {String}   _city       The city it.
 * @apiSuccess {Number}   year        Year num
 * @apiSuccess {Number}   month       Month num
 * @apiSuccess {String}   name        Month name
 * @apiSuccess {Number}   avgMinTemp  Average temperature
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *         "_id": "5ed2721de312bd2d126d580f",
 *         "_city": "5ed26e0b1d567b579e9107cc",
 *         "year": 2020,
 *         "month": 6,
 *         "name": "June"
 *         "absMaxTemp": 27.638666,
 *         "absMaxTempF": 81.7,
 *         "avgDailyRainfall": 0.5,
 *         "avgMinTemp": 12.6,
 *         "avgMinTempF": 54.6,
 *         "created": "2020-05-30T14:47:57.833Z",
 *       }
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 403 Not Allowed
 *     {
 *       'error': 'Access is not allowed!'
 *     }
 */
const processMonthly = async function (req, res, next) {
  const cname = String(req.params.cname);
  const month = Number(req.params.month);
  const year  = new Date().getUTCFullYear();

  if ( month < 1 || month > 12 ) {
    return res.status(400).json({ error: 'Invalid month number!' })
  }

  const { error, monthly } = await handleMonthlyRecords(cname, year, month);

  if (error) {
    return res.status(400).json({ error })
  }

  return res.json(monthly)
};

const processCovilha = async function (req, res, next) {
  const cname = 'covilha';
  const month = 6;
  const year  = new Date().getUTCFullYear();

  const { error, monthly } = await handleMonthlyRecords(cname, year, month);

  if (error) {
    return res.status(400).json({ error })
  }

  if (req.query.verbose) {
    return res.json(monthly)
  }

  return res.json({
    month: monthly.month,
    absMaxTemp: monthly.absMaxTemp,
    absMaxTempF: monthly.absMaxTempF,
    avgDailyRainfall: monthly.avgDailyRainfall,
    avgMinTemp: monthly.avgMinTemp,
    avgMinTempF: monthly.avgMinTempF
  })
};



module.exports = {
  processMonthly,
  processCovilha
}