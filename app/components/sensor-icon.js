import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @computed('sensor.type')
  get name() {
    // return +this.get('sensor.type');
    switch (+this.get('sensor.type')) {
      case 1:
        return 'electricity';
      case 2:
      case 3:
        return 'water';
      case 4:
        return 'gas';
      default:
        return 'sensor';
    }
  }
}
