import Component from '@ember/component';

export default class extends Component {
  classNames = [
    this.get('styleNamespace'), /* eslint-disable-line no-invalid-this */
    'item',
    'card',
    'col-4',
    'no-padding',
  ];
}
