import BackendService from './backend';
import {inject as service} from '@ember/service';

import {IS_LITE_MODE} from '../constants';

const BaseAuthService = class extends BackendService {
  @service cookies;
  @service store;

  sendToken = false;

  isAuthorized = undefined;
  isSetupRequired = undefined;

  async init() {}

  get token() {
    return this.get('cookies').read('token');
  }

  set token(value) {
    this.get('cookies').write('token', value, {path: '/'});
  }

  async logIn({username, password}) {
    const data = {password};
    if (!IS_LITE_MODE) {
      data.login = username;
    }
    return this.request('/sign_in', 'POST', data).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response['token']);
      return this.get('store').findRecord('user', 1);
    }).catch(() => false);
  }

  async signUp({
    username,
    lastName,
    firstName,
    middleName,
    password,
  }) {
    const data = {password};
    if (!IS_LITE_MODE) {
      data.login = username;
    }
    return this.request('/sign_up', 'POST', data).then(async (response) => {
      this.set('isAuthorized', true);
      this.set('token', response['token']);
      const user = await this.get('store').findRecord('user', 1);
      if (!IS_LITE_MODE) {
        user.set('email', username);
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('middleName', middleName);
        await user.save();
      }
      return user;
    }).catch(() => false);
  }

  logOut() {
    // simply remove JWT token
    this.set('token', '');
    this.set('isAuthorized', false);
    this.get('store').unloadAll();
    return true;
  }
};

const DefaultAuthService = class extends BaseAuthService {
  isSetupRequired = false;
};

const LiteAuthService = class extends BaseAuthService {
  isSetupRequired = false;

  async init() {
    const response = await this.request('/user/list', 'GET');
    this.set('isSetupRequired', !(response && response.users && response.users.length));
  }
};

export default IS_LITE_MODE ? LiteAuthService : DefaultAuthService;
