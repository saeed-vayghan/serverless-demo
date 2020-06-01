'use strict';

const city = {
  'query': 'covilha-test',
  'name': 'Covilha-Test, Portugal',
  'timeZone': {
    'utcOffset': '1.0',
    'zone': 'Europe/Lisbon'
  },
  'status': true
};

const weather = {
  '_city': null,
  'localtime': '2010-05-29 20:59',
  'utc': 2010529204,

  'condition': {
    'weatherCode': 116,
    'weatherIconUrl': [],
    'weatherDesc': [],
    'windspeedMiles': 6,
    'windspeedKmph': 9,
    'winddirDegree': 297,
    'humidity': 50,
    'visibility': 10,
    'visibilityMiles': 6,
    'pressure': 1012,
    'pressureInches': 30,
    'cloudcover': 39,
    'FeelsLikeC': 29,
    'FeelsLikeF': 85,
    'uvIndex': 1
  },

  'created': new Date('2010-05-29T20:04:35.848Z')
};

const monthly = {
  '_city': null,
  'year': 2010,
  'month': 6,
  'name': 'June',
  'absMaxTemp': 27.638666,
  'absMaxTempF': 81.7,
  'avgDailyRainfall': 0.5,
  'avgMinTemp': 12.6,
  'avgMinTempF': 54.6,
  'created': new Date('2010-05-30T07:51:34.779Z')
};


module.exports = {
  city,
  weather,
  monthly
};