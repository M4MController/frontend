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
      const sensorId = this.get('sensorId');
      const sensor = this.get('store').peekRecord('sensor', sensorId);
      let from = new Date(sensor.get('values').sortBy('timestamp').get('lastObject.timestamp'));
      from.setHours(from.getHours() + 3);
      from = from.toISOString();
      const a = await this.get('store').query('sensor-value', {sensorId});
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
      this.startAutoUpdate();
    }, 10 * 1000);
    this.set('autoUpdateTimer', timer);
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
