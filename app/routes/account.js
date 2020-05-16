import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {addListener} from '@ember/object/events';
import {cancel, later} from '@ember/runloop';
import {on} from '@ember-decorators/object';
import {IS_LITE_MODE} from '../constants';

const updateInterval = IS_LITE_MODE ? 1000 : 60 * 1000;

export default class extends Route {
  @service auth;

  async model() {
    return {
      user: (await this.get('store').peekRecord('user', 1)),
      objects: await this.get('store').findAll('object'),
    };
  }

  beforeModel() {
    addListener(this.get('auth'), 'log-in-required', () => this.transitionTo('auth.log-in'));
  }

  @on('activate')
  startAutoUpdate() {
    const timer = later(this, async function() {
      await this.get('store').findAll('object', {reload: true}); // eslint-disable-line
      this.startAutoUpdate(); // eslint-disable-line
    }, updateInterval);
    this.set('autoUpdateTimer', timer);
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
