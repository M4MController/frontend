/* eslint-disable no-invalid-this */

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

  model({'sensor_id': sensorId, field}) {
    this.set('sensorId', sensorId);
    this.get('store').query('sensor-value', {sensorId, field});
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

      const from = new Date(Math.max(...sensor.get('values').mapBy('date').toArray()));
      (await this.get('store').query('sensor-value', {sensorId, from})).forEach((value) => {
        this.get('store').pushPayload({
          'sensor-value': [
            {
              sensor: value.get('sensor.id'),
              id: value.get('id'),
              value: value.get('value'),
              time: value.get('time'),
            },
          ],
        });
      });
    }, 60 * 1000);
    this.set('autoUpdateTimer', timer);
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
