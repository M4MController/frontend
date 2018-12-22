import Route from '@ember/routing/route';
import {cancel, later} from '@ember/runloop';
import {on} from '@ember-decorators/object';

export default class extends Route {
  async model() {
    return {
      user: (await this.get('store').peekRecord('user', 1)),
      objects: await this.get('store').findAll('object'),
    };
  }

  @on('activate')
  startAutoUpdate() {
    const timer = later(this, async function() {
      await this.get('store').findAll('object', {reload: true}); // eslint-disable-line
      this.startAutoUpdate(); // eslint-disable-line
    }, 60 * 1000);
    this.set('autoUpdateTimer', timer);
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
