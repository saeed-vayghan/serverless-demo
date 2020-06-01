'use strict';

const config = require('../../../config');


const checkToken = async function (req, res, next) {
  const headers = req.headers

  if ( headers['auth-token'] !== config.authToken ) {
    return res.status(403).json({ error: 'Access is not allowed!' })
  }

  next()
};



module.exports = {
  checkToken
}