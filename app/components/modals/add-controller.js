import Component from '@ember/component';
import {
  action,
  computed,
  on,
} from '@ember-decorators/object';
import {
  and,
} from '@ember-decorators/object/computed';

export default class extends Component {
  controllerId = '';

  @on('didRender')
  focusOnInput() {
    this.$('.input').focus();
  }

  @computed('controllerId')
  get isValidControllerId() {
    const controllerId = this.get('controllerId');
    return !controllerId || +controllerId;
  }

  @and('controllerId', 'isValidControllerId') isValid;

  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  }

  @action
  onAddClickAction() {
    this.get('isValidControllerId') && this.attrs.onAdd && this.attrs.onAdd(this.get('controllerId'));
  }
}
