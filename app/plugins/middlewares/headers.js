'use strict';


const setHeaders = async function (req, res, next) {
  res.charset = 'utf-8';
  res.setHeader('API-Version', '1.0.1');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');

  next();
};

const setCorsResponse = async function(req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Accept-Encoding, Cache-Control, App-Version, Client');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

  next();
};

// const checkUserAgent = function (req, res, next) {
//   do some thing here later
// };


module.exports = {
  setHeaders,
  setCorsResponse
}