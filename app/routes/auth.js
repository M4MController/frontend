import Route from '@ember/routing/route';

import {service} from '@ember-decorators/service';

export default class extends Route {
  @service auth;

  async beforeModel() {
    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    }
  }
}
