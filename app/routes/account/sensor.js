import Route from '@ember/routing/route';

export default class extends Route {
  model({'sensor_id': sensorId}) {
    this.get('store').query('sensor-value', {sensorId});
    return this.get('store').peekRecord('sensor', sensorId);
  }
}
