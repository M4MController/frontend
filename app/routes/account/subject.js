import Route from '@ember/routing/route';
import {observes} from '@ember-decorators/object';

export default class extends Route {
  @observes('model.name')
  onObjectNameChange() {
    this.set('pageTitle', this.get('model.name'));
  }

  async model(params) {
    const objectId = params['object_id'];

    const result = this.get('store').peekRecord('object', objectId);

    // todo: remove undefined after https://github.com/M4MController/backend/issues/33 will completed
    this.get('store').peekAll('sensor').filterBy('type', undefined).forEach((sensor) => {
      this.get('store').query('sensor-value', {sensorId: sensor.get('id'), limit: 1});
    });

    return result;
  }

  afterModel(model) {
    this.set('pageTitle', model.get('name'));
  }
}
