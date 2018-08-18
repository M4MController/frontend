import Route from '@ember/routing/route';
import {addListener} from '@ember/object/events';
import {service} from '@ember-decorators/service';

export default class extends Route {
  @service backend;

  constructor(...args) {
    super(...args);

    addListener(this.get('backend'), 'log-in-required', () => this.transitionTo('auth.log-in'));
  }
}
