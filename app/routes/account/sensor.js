import Route from '@ember/routing/route';
import {cancel, later} from '@ember/runloop';
import {observes, on} from '@ember-decorators/object';

export default class extends Route {
  autoUpdateTimer;
  sensorId;

  @observes('model.name')
  onObjectNameChange() {
    this.set('pageTitle', this.get('model.name'));
  }

  model({'sensor_id': sensorId}) {
    this.set('sensorId', sensorId);
    this.get('store').query('sensor-value', {sensorId});
    return this.get('store').peekRecord('sensor', sensorId);
  }

  afterModel(model) {
    this.set('pageTitle', model.get('name'));
  }

  @on('activate')
  startAutoUpdate() {
    const timer = later(this, async function() {
      // todo: вычистить этот треш. в частности избавиться от pushPayload
      this.startAutoUpdate();
      const sensorId = this.get('sensorId');
      const sensor = this.get('store').peekRecord('sensor', sensorId);
      let startDate = new Date(sensor.get('values').sortBy('timestamp').get('lastObject.timestamp'));
      startDate.setHours(startDate.getHours() + 3);
      startDate = startDate.toISOString();
      const a = await this.get('store').query('sensor-value', {
        sensorId,
        from: startDate.slice(0, startDate.length - 5),
      });
      a.forEach((value) => {
        this.get('store').pushPayload({
          'sensor-value': [
            {
              sensor: value.get('sensor.id'),
              id: value.get('id'),
              value: value.get('value'),
              timestamp: value.get('timestamp'),
            },
          ],
        });
      });
    }, 10 * 1000);
    this.set('autoUpdateTimer', timer);
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
