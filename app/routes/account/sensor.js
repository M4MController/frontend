import Route from '@ember/routing/route';
import {observes} from '@ember-decorators/object';

export default class extends Route {
  @observes('model.name')
  onObjectNameChange() {
    this.set('pageTitle', this.get('model.name'));
  }

  model({'sensor_id': sensorId}) {
    this.get('store').query('sensor-value', {sensorId});
    return this.get('store').peekRecord('sensor', sensorId);
  }

  afterModel(model) {
    this.set('pageTitle', model.get('name'));
  }
}
