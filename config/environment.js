/* eslint-env node */
'use strict';

const LITE_MODE = process.env['MODE'] === 'lite';
const USE_PROXY = process.env['SERVER'] === 'proxy';

module.exports = function(environment) {
  let ENV = {
    'modulePrefix': 'm4m',
    environment,
    'rootURL': '/',
    'locationType': 'auto',
    'EmberENV': {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    'APP': {
      environment,
      isLiteMode: LITE_MODE,
      isUsingProxy: USE_PROXY,
      backend: {
        api: null, // эти переменные определены далее в конфиге
        auth: null,
      },
    },
    'ember-google-maps': {
      key: process.env['GOOGLE_API_MAPS_KEY'],
      language: 'en',
      region: 'GB',
      protocol: 'https',
      version: '3.35',
      libraries: ['geometry', 'places'],
    },
  };

  if (USE_PROXY) {
    if (LITE_MODE) {
      ENV.APP.backend.api = '/api';
      ENV.APP.backend.auth = '/api';
    } else {
      ENV.APP.backend.api = '/api/api';
      ENV.APP.backend.auth = '/api/auth';
    }

    // чтобы дать серверу-проксировщику знать, куда проксировать запрос
    ENV.APP.proxy = {
      api: process.env['BACKEND_API'] || 'https://api.meter4.me',
      auth: process.env['BACKEND_AUTH'] || 'https://auth.meter4.me',
    };
  } else {
    if (LITE_MODE) {
      ENV.APP.backend.api = process.env['BACKEND_API'] || '/api';
      ENV.APP.backend.auth = process.env['BACKEND_AUTH'] || '/api';
    } else {
      ENV.APP.backend.api = process.env['BACKEND_API'] || 'https://api.meter4.me';
      ENV.APP.backend.auth = process.env['BACKEND_AUTH'] || 'https://auth.meter4.me';
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
