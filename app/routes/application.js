import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';

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
