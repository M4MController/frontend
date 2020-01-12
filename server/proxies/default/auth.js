'use strict';

const config = require('../../../config/environment')();

const proxyPath = config.APP.backend.auth;
const target = config.APP.proxy.auth;

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  const proxy = require('http-proxy').createProxyServer({
    changeOrigin: true,
    target,
  });

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next) {
    proxy.web(req, res);
  });
};
