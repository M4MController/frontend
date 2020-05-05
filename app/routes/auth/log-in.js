import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default class extends Route {
  @service auth;
  pageTitle = 'Авторизация';

  afterModel() {
    if (this.get('auth.isSetupRequired')) {
      this.transitionTo('auth.sign-up');
    }
  }
}
