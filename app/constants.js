import config from './config/environment';

const appConfig = config.APP;

export const IS_DEV = appConfig.environment === 'development';

export const IS_LITE_MODE = appConfig.isLiteMode;

export const BACKEND_API = appConfig.backend.api;

export const GRID_STEP = 8;
