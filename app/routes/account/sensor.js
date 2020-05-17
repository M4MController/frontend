/* eslint-disable no-invalid-this */

import Route from '@ember/routing/route';
import {cancel, later} from '@ember/runloop';
import {observes, on} from '@ember-decorators/object';
import {IS_LITE_MODE} from '../../constants';

export default class extends Route {
  autoUpdateTimer;
  sensorId;

  @observes('model.sensor.name')
  onObjectNameChange() {
    this.set('pageTitle', this.get('model.sensor.name'));
  }

  async model({'sensor_id': sensorId, field}) {
    const store = this.get('store');

    this.set('sensorId', sensorId);
    if (IS_LITE_MODE) {
      store.query('sensor-value', {sensorId, field, limit: 1000});
    }
    this.set('field', field);
    return {
      companies: this.get('isLiteMode') ? null : await store.findAll('company'),
      sensor: store.peekRecord('sensor', sensorId),
    };
  }

  afterModel(model) {
    this.set('pageTitle', model.sensor.get('name'));
  }

  @on('activate')
  startAutoUpdate() {
    if (IS_LITE_MODE) {
      const timer = later(this, async function() {
        // todo: вычистить этот треш. в частности избавиться от pushPayload
        this.startAutoUpdate();
        const sensorId = this.get('sensorId');
        const sensor = this.get('store').peekRecord('sensor', sensorId);

        const from_ = new Date(Math.max(...sensor.get('values').mapBy('timestamp').toArray()));
        (await this.get('store').query(
          'sensor-value',
          {
            sensorId,
            'from': from_.getTime() ? from_ : undefined,
            'field': this.get('field'),
            'limit': 1000,
          })).forEach((value) => {
          this.get('store').pushPayload({
            'sensor-value': [
              {
                sensor: value.get('sensor.id'),
                id: value.get('id'),
                data: value.get('data'),
                sign: value.get('sign'),
                signer: value.get('signer'),
              },
            ],
          });
        });
      }, 1000);
      this.set('autoUpdateTimer', timer);
    }
  }

  @on('deactivate')
  stopAutoUpdate() {
    cancel(this.get('autoUpdateTimer'));
  }
}
