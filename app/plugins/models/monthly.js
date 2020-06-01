'use strict';

const sanitize = require('../utils/sanitizer');
const mongoose = require('mongoose');

const Monthly  = mongoose.model('Monthly');



const upsertMonthly = async function (record) {
  let error    = null;
  let upserted = null;

  try {
    const result = await Monthly.updateOne({ _city: record._city, year: record.year, month: record.month }, { $set: sanitize(record) }, { upsert: true })
    upserted = await Monthly.findById(result.upserted[0]._id);
  } catch (ex) {
    error = ex;
  }

  return {
    upserted,
    error
  }
};

const getMonthlyByCityAndTime = async function (_city, year, month) {
  let error  = null;
  let record   = null;

  try {
    record = await Monthly.findOne({ _city, year, month });
  } catch (ex) {
    error = ex;
  }

  return {
    record,
    error
  }
};

const deleteMonthly = async function (_id) {
  let error = null;

  try {
    await Monthly.deleteOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    error
  };
};


module.exports = {
  upsertMonthly,
  getMonthlyByCityAndTime,
  deleteMonthly
}