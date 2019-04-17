import BackendService from './backend';

import {BACKEND_API} from '../constants';

export default class extends BackendService {
  baseUrl = BACKEND_API;
}
