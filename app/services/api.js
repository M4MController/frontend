import BackendService from './backend';

import config from '../config/environment';

export default class extends BackendService {
  baseUrl = config.APP.backend.api;
}
