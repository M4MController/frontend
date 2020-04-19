import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default class extends Route {
  @service intl;
  @service auth;

  beforeModel() {
    return this.intl.setLocale(['ru-ru']); /* array optional */
  }

  async model() {
    await this.get('auth').init();
    return {
      user: await this.get('store').findRecord('user', 1).catch(() => null),
    };
  }
}
