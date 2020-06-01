'use strict';

const sanitize = require('../utils/sanitizer');
const mongoose = require('mongoose');

const City     = mongoose.model('City');



const createCity = async function (city) {
  let error   = null;
  let created = null;

  try {
    created = await City.create(sanitize(city));
  } catch (ex) {
    error = ex;
  }

  return {
    created,
    error
  };
};

const getCityByName = async function (query) {
  let error = null;
  let city  = null;

  try {
    city = await City.findOne({ query: sanitize(query) });
  } catch (ex) {
    error = ex;
  }

  return {
    city,
    error
  };
};

const deleteCity = async function (_id) {
  let error = null;

  try {
    await City.deleteOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    error
  };
};


module.exports = {
  createCity,
  getCityByName,
  deleteCity
}