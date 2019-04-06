import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';
import config from '../config/environment';

export default class extends Route {
  @service auth;

  afterModel() {
    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    } else {
      if (config.APP.isLiteMode) {
        this.transitionTo('auth.log-in');
      } else {
        this.transitionTo('redirect', {queryParams: {to: 'landing'}});
      }
    }
  }
}
