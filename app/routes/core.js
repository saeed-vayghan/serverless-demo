'use strict';

module.exports = function(app) {

  const core    = require('../controllers/core');
  const city    = require('../controllers/city');
  const weather = require('../controllers/weather');
  const monthly = require('../controllers/monthly');

  const headerMiddleWares = require('../plugins/middlewares/headers');
  const authMiddleWares   = require('../plugins/middlewares/authentication');
  const apiCallLogger     = require('../plugins/apiCallLogger');

  app.options('*',  headerMiddleWares.setCorsResponse);
  app.all('*',  headerMiddleWares.setHeaders, apiCallLogger.log);
  app.all('/info', core.info);

  app.all('/api/*', authMiddleWares.checkToken);

  app.get('/api/currentweather/:cname', city.processCity, weather.processWeather);
  app.get('/api/currenttempincovilha', city.processCovilha, weather.processCovilha); // redundant route just for demo

  app.get('/api/avgtemp/:cname/:month', city.processCity, monthly.processMonthly);
  app.get('/api/avgtempinsfax', city.processCovilha, monthly.processCovilha); // redundant route just for demo
};