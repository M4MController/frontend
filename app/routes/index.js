import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';

export default class extends Route {
  @service auth;

  afterModel() {
    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    } else {
      this.transitionTo('redirect', {queryParams: {to: 'landing'}});
    }
  }
}
