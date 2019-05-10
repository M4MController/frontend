import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @computed('object.sensors')
  get sensors() {
    return this.get('object.sensors').slice(0, 4);
  }

  @computed('object.sensors.@each.status')
  get status() {
    let ok = false;
    for (const sensor of this.get('object.sensors')) {
      if (sensor.get('status')) {
        ok = true;
      } else {
        if (ok) {
          return 'warning';
        }
      }
    }
    return ok ? 'ok' : 'danger';
  }
}
