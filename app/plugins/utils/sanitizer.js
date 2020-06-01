'use strict';

// credit: https://github.com/vkarpov15/mongo-sanitize/blob/master/LICENSE

function sanitize(v) {
  if (v instanceof Object) {
    for (const key in v) {
      if (/^\$/.test(key)) {
        delete v[key];
      } else {
        sanitize(v[key]);
      }
    }
  }
  return v;
};


module.exports = sanitize;