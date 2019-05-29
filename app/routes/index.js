import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

import {IS_LITE_MODE} from '../constants';

export default class extends Route {
  @service auth;

  afterModel() {
    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    } else {
      if (IS_LITE_MODE) {
        this.transitionTo('auth.log-in');
      } else {
        this.transitionTo('redirect', {queryParams: {to: 'landing'}});
      }
    }
  }
}
