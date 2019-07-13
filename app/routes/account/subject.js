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

    result.get('sensors').
        filter((sensor) => sensor.get('typeName') === 'gps' || sensor.get('typeName') === 'obd').
        forEach((sensor) => {
          this.get('store').query('sensor-value', {sensorId: sensor.get('id'), limit: 1});
        });

    return result;
  }

  afterModel(model) {
    this.set('pageTitle', model.get('name'));
  }
}
