import Service from '@ember/service';

import {service} from '@ember-decorators/service';

export default class extends Service {
  @service backend;
  @service store;

  isAuthorused = undefined;

  async logIn(username, password) {
    return this.get('backend').request('/auth/login', 'POST', {
      username,
      password,
    }).then(() => {
      this.set('isAuthorized', true);
      return true;
    }).catch(() => false)
    /* stub until backend does not support sign in */.catch(() => {}).then(() => {
      this.set('isAuthorized', true);
      return true;
    });
  }

  logOut() {
    return this.get('backend').request('/auth/logout', 'POST').then(() => {
      this.set('isAuthorized', false);
      this.get('store').unloadAll();
      return true;
    })
    /* stub until backend does not support sign out */.catch(() => {}).then(() => {
      this.set('isAuthorized', false);
      this.get('store').unloadAll();
      return true;
    });
  }
}
