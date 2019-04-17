import BackendService from './backend';
import {service} from '@ember-decorators/service';

import {BACKEND_AUTH, IS_LITE_MODE} from '../constants';

export default class extends BackendService {
  @service cookies;
  @service store;

  baseUrl = BACKEND_AUTH;
  sendToken = false;

  isAuthorized = IS_LITE_MODE;

  get token() {
    return this.get('cookies').read('token');
  }

  set token(value) {
    this.get('cookies').write('token', value, {path: '/'});
  }

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
}
