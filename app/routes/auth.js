import Route from '@ember/routing/route';

import {service} from '@ember-decorators/service';

export default class extends Route {
  @service auth;

  async beforeModel() {
    // try to check whether user is logged in
    await this.get('store').findRecord('user', 1).catch(() => {
    });

    if (this.get('auth.isAuthorized')) {
      this.transitionTo('account.index');
    }
  }
}
