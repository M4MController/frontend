import Route from '@ember/routing/route';

export default class extends Route {
  async model({'sensor_id': sensorId}) {
    await this.get('store').query('sensor-value', {sensorId});
    return this.get('store').peekRecord('sensor', sensorId);
  }
}
