'use strict';

module.exports = function(app) {
  const serverMode = process.env['SERVER'];
  if (!serverMode) return;

  const globSync = require('glob').sync;

  const mode = process.env['MODE'] || 'default';

  const modules = [];
  switch (serverMode) {
    case 'proxy':
      if (mode === 'lite') throw 'Proxy is not implemented for lite mode';
      const proxies = globSync(`./proxies/${mode}/*.js`, {cwd: __dirname}).map(require);
      modules.push(...proxies);
      break;
    case 'mock':
      if (mode === 'default') throw 'Proxy is not implemented for default mode';
      const mocks = globSync(`./mocks/${mode}/*.js`, {cwd: __dirname}).map(require);
      modules.push(...mocks);
      break;
  }

  // Log proxy requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  modules.forEach(route => route(app));
};
