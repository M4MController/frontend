import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  classNames = [
    this.get('styleNamespace'), /* eslint-disable-line no-invalid-this */
    'item',
    'card',
    'col-4',
    'no-padding',
  ];

  @computed('object.controllers')
  get sensors() {
    return this.get('object.controllers').
      toArray().
      map((controller) => controller.get('sensors').toArray()).
      reduce((sensors1, sensors2) => sensors1.concat(sensors2), []);
  }
}
