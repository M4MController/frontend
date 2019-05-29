import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default class extends Route {
  @service intl;

  beforeModel() {
    return this.intl.setLocale(['ru-ru']); /* array optional */
  }

  async model() {
    return {
      user: await this.get('store').findRecord('user', 1).catch(() => null),
    };
  }
}
