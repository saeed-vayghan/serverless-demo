'use strict';

// var uuid = require('uuid').v4;

// var redis  = require('../redis');
// var rabbit = require('../rabbit');


const log = async function (req, res, next) {
  // var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // var hyperLogKey = 'uniqueIPHll';
  // redis.pfadd(hyperLogKey, ip);

  // var data = {
  //   uuid: uuid(),
  //   server: process.env.NODE_SERVER,
  //   title: 'apiCall',

  //   userAgent: req.headers['user-agent'] || '',
  //   ip: ip,

  //   method: req.method,
  //   path: req.path,

  //   ts: new Date().getTime()
  // };

  // rabbit.publishTask(data, 'apiCall');

  next();
};


module.exports = {
  log
}