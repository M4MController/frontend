import BackendService from './backend';
import {inject as service} from '@ember/service';

import {BACKEND_AUTH, IS_LITE_MODE} from '../constants';

const BaseAuthService = class extends BackendService {
  @service cookies;
  @service store;

  baseUrl = BACKEND_AUTH;
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

  logIn() {
    throw new Error('Not implemented');
  }

  signUp() {
    throw new Error('Not implemented');
  }

  logOut() {
    this.set('token', '');
    this.set('isAuthorized', false);
    this.get('store').unloadAll();
    return true;

    /* till backend does not support log out */
    // return this.get('backend').request('/logout', 'POST').then(() => {
    //   this.set('isAuthorized', false);
    //   this.get('store').unloadAll();
    //   return true;
    // });
  }
};

const DefaultAuthService = class extends BaseAuthService {
  isSetupRequired = false;

  async logIn(username, password) {
    return this.request('/sign_in', 'POST', {
      'e_mail': username,
      password,
    }, {dataType: 'html'}).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response);
      return this.get('store').findRecord('user', 1);
    }).catch(() => false);
  }

  async signUp({username, lastName, firstName = '', middleName = '', password}) {
    return this.request('/sign_in', 'POST', {
      'e_mail': username,
      password,
    }, {dataType: 'html'}).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response);
      return this.get('store').findRecord('user', 1);
    }).catch(() => false);
  }
};

const LiteAuthService = class extends BaseAuthService {
  isAuthorized = false;
  isSetupRequired = false;

  async init() {
    const response = await this.request('/user/list', 'GET');
    this.set('isSetupRequired', !(response && response.users && response.users.length));
  }

  async logIn(username, password) {
    return this.request('/sign_in', 'POST', {
      login: username,
      password,
    }).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response['token']);
      return this.get('store').findRecord('user', 1);
    }).catch(() => false);
  }

  async signUp({username, lastName, password}) {
    return this.request('/sign_up', 'POST', {
      login: username,
      password,
    }).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response['token']);
      return this.get('store').findRecord('user', 1);
    }).catch(() => false);
  }
};

export default IS_LITE_MODE ? LiteAuthService : DefaultAuthService;
