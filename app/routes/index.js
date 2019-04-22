import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';

import {IS_LITE_MODE} from '../constants';

export default class extends Route {
  @service auth;

  afterModel() {
    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    } else {
      if (IS_LITE_MODE) {
        alert('Что-то пошло не так. Этого быть не должно.');
      } else {
        this.transitionTo('redirect', {queryParams: {to: 'landing'}});
      }
    }
  }
}
