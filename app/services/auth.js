import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class extends Service {
  @service backend;
  @service store;

  @service cookies;

  isAuthorised = undefined;

  get token() {
    return this.get('cookies').read('token');
  }

  set token(value) {
    this.get('cookies').write('token', value, {path: '/'});
  }


  async logIn(username, password) {
    return this.get('backend').request('/auth/sign_in', 'POST', {
      'e_mail': username,
      password,
    }, {dataType: 'html'}).then((response) => {
      this.set('isAuthorized', true);
      this.set('token', response);
      return true;
    }).catch(() => false);
  }

  logOut() {
    this.set('token', '');
    this.set('isAuthorized', false);
    this.get('store').unloadAll();
    return true;

    /* till backend does not support log out */
    // return this.get('backend').request('/auth/logout', 'POST').then(() => {
    //   this.set('isAuthorized', false);
    //   this.get('store').unloadAll();
    //   return true;
    // });
  }
}
