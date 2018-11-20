import Component from '@ember/component';
import ModalMixin from 'm4m/mixins/modal';
import {action} from '@ember-decorators/object';

export default class extends Component.extend(ModalMixin, {}) {
  state = 'from-list';

  sources = [
    {
      id: 1,
      name: 'Wi-Fi',
      logo: 'wifi',
    },
    {
      id: 2,
      name: 'Bluetooth',
      logo: 'bluetooth',
    },
    {
      id: 3,
      name: 'USB',
      logo: 'usb',
    },
    {
      id: 4,
      name: 'Импульсный',
      logo: 'pulse',
    },
  ];

  @action
  onSubmitAction(objectAttrs) {
    this.attrs.onAdd && this.attrs.onAdd(objectAttrs);
  }
}
