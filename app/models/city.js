'use strict';

const mongoose = require('mongoose')
const Schema   = mongoose.Schema


/**
 * City Schema
 */
const CitySchema = new Schema(
  {
    query: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },

    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },

    timeZone: {
      utcOffset: String,
      zone: String
    },

    status: {
      type: Boolean,
      default: 0
    },

    created: Date,
    updated: Date
  },
  {
    collection: 'cities',
    strict: true,
    autoIndex: false
  }
);

const lastMod = function (schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.created = new Date();
    }

    this.updated = new Date();

    next();
  });
};

CitySchema.plugin(lastMod);
CitySchema.index({ query: 1 }, { unique: true });
CitySchema.index({ name: 1 }, { unique: true });


// CitySchema.pre('save', function(next) {
//   next();
// });

// CitySchema.post('save', function(doc) {
// });

// CitySchema.post('remove', function(doc) {
// });

// db.cities.createIndex({ query: 1 }, { background: true, unique: true })
// db.cities.createIndex({ name: 1 }, { background: true, unique: true })

module.exports = mongoose.model('City', CitySchema);