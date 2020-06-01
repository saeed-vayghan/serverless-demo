'use strict';

const getUTCKey = function (input = null) {
  const ts = input ? new Date(input) : new Date();

  return Number(`${ts.getUTCFullYear()}${ts.getUTCMonth()+1}${ts.getUTCDate()}${ts.getUTCHours()}${ts.getUTCMinutes()}`);
};


module.exports = {
  getUTCKey
}