'use strict';

const mongoose = require('mongoose')
const Schema   = mongoose.Schema


/**
 * Monthly Schema
 */
const inexEnum = Array.from(Array(12).keys(), n => n + 1);
const NameEnum = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const MonthlySchema = new Schema(
  {
    _city: { type: Schema.Types.ObjectId, ref: 'Monthly', required: true },

    year: {
      type: Number,
      required: true,
      default: 2020
    },

    month: {
      type: Number,
      enum: inexEnum,
      required: true
    },

    name: {
      type: String,
      enum: NameEnum,
      required: true
    },

    avgMinTemp: Number,
    avgMinTempF: Number,

    absMaxTemp: Number,
    absMaxTempF: Number,

    avgDailyRainfall: Number,

    created: Date
  },
  {
    collection: 'monthly',
    strict: true,
    autoIndex: false
  }
);

MonthlySchema.index({ _city: 1, year: 1, month: 1 }, { unique: true });


// MonthlySchema.pre('save', function(next) {
//   next();
// });

// MonthlySchema.post('save', function(doc) {
// });

// MonthlySchema.post('remove', function(doc) {
// });

// db.monthly.createIndex({ _city: 1, year: 1, month: 1 }, { background: true, unique: true })

module.exports = mongoose.model('Monthly', MonthlySchema);