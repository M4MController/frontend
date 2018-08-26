import Component from '@ember/component';
import {
  action,
  computed,
} from '@ember-decorators/object';
import {
  and,
} from '@ember-decorators/object/computed';

export default class extends Component {
  macAddress = '';

  @computed('macAddress')
  get isValidMacAddress() {
    return !this.get('macAddress') || /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(this.get('macAddress'));
  }
  @and('macAddress', 'isValidMacAddress') isValid;

  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  }

  @action
  onAddClickAction() {
    this.get('isValidMacAddress') && this.attrs.onAdd && this.attrs.onAdd(this.get('name'));
  }
}
