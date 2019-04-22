import config from './config/environment';

const appConfig = config.APP;

export const IS_LITE_MODE = appConfig.isLiteMode || !appConfig.backend;

export const BACKEND_API = function() {
  if (IS_LITE_MODE) {
    return '/api';
  } else if (appConfig.isUsingProxy) {
    return '/api/api';
  } else {
    return appConfig.backend.api;
  }
}();

export const BACKEND_AUTH = function() {
  if (IS_LITE_MODE) {
    return null;
  } else if (appConfig.isUsingProxy) {
    return '/api/auth';
  } else {
    return appConfig.backend.auth;
  }
}();

export const GRID_STEP = 8;
