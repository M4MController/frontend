import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @computed(
    'sensor.curMonthAmount',
    'sensor.lastMonthAmount',
    'sensor.yearAverageAmount',
  ) get stats() {
    return [
      {
        name: 'Current month',
        value: this.get('sensor.curMonthAmount'),
      },
      {
        name: 'Last month',
        value: this.get('sensor.lastMonthAmount'),
      },
      {
        name: 'Year average',
        value: this.get('sensor.yearAverageAmount'),
      },
    ];
  }
}
