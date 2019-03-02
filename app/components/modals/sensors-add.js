import Component from '@ember/component';
import ModalMixin from 'm4m/mixins/modal';
import {action} from '@ember-decorators/object';
import {closeModal} from '../../helpers/close-modal';

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
    this.set('loading', true);
    setTimeout(() => {
      this.set('loading', false);
      this.onSuccess && this.onSuccess([]);
      closeModal(this.get('modalId'));
    }, 1500);
  }
}
