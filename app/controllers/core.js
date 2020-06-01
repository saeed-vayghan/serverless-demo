'use strict';


exports.info = async function (req, res, next) {
  return await res.json({ message: 'Welcome to the API server!!' })
};
