import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';
import {addListener} from '@ember/object/events';
import {cancel, later} from '@ember/runloop';
import {on} from '@ember-decorators/object';

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

  afterModel(model) {
    // todo: remove the stub
    const company = this.get('store').createRecord('service-company', {
      id: 100500,
      name: 'Гараж 4x4',
      phone: '8 (800) 555-35-35',
      address: 'Ильменский пр., 9А, стр. 12, Москва',
    });
    model.user.get('companies').pushObject(company);
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
