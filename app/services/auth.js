import Service from '@ember/service';

import {service} from '@ember-decorators/service';

export default class extends Service {
  @service backend;
  @service store;

  isAuthorused = undefined;

  logIn(username, password) {
    return this.get('backend').request('/auth/login', 'POST', {
      username,
      password,
    }).then(() => {
      this.set('isAuthorized', true);
      return true;
    }).catch(() => false);
  }

  logOut() {
    return this.get('backend').request('/auth/logout', 'POST').then(() => {
      this.set('isAuthorized', false);
      this.get('store').unloadAll();
      return true;
    });
  }
}
