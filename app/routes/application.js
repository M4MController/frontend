import Route from '@ember/routing/route';
import {addListener} from '@ember/object/events';
import {service} from '@ember-decorators/service';

export default class extends Route {
  @service backend;

  async model() {
    return {
      user: await this.get('store').findRecord('user', 1).catch(() => null),
    };
  }

  afterModel() {
    addListener(this.get('backend'), 'log-in-required', () => this.transitionTo('auth.log-in'));
  }
}
