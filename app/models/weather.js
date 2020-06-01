'use strict';

const mongoose = require('mongoose')
const Schema   = mongoose.Schema


/**
 * Weather Schema
 */
const WeatherSchema = new Schema(
  {
    _city: { type: Schema.Types.ObjectId, ref: 'Weather', required: true },

    utc: {
      type: Number,
      required: true
    },

    localtime: {
      type: String,
      required: true
    },

    condition: {
      tempC: Number,
      tempF: Number,
      observationTime: String,
      tempC: Number,
      tempF: Number,
      weatherCode: Number,
      weatherIconUrl: [{}],
      weatherDesc: [{}],
      windspeedMiles: Number,
      windspeedKmph: Number,
      winddirDegree: Number,
      humidity: Number,
      visibility: Number,
      visibilityMiles: Number,
      pressure: Number,
      pressureInches: Number,
      cloudcover: Number,
      FeelsLikeC: Number,
      FeelsLikeF: Number,
      uvIndex: Number
    },

    created: Date
  },
  {
    collection: 'weathers',
    strict: true,
    autoIndex: false
  }
);

WeatherSchema.index({ _city: 1, utc: 1 }, { unique: true });


// WeatherSchema.pre('save', function(next) {
//   next();
// });

// WeatherSchema.post('save', function(doc) {
// });

// WeatherSchema.post('remove', function(doc) {
// });

// db.weathers.createIndex({ _city: 1, utc: 1 }, { background: true, unique: true })

module.exports = mongoose.model('Weather', WeatherSchema);