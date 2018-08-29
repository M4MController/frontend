import Component from '@ember/component';
import {
  action,
  on,
} from '@ember-decorators/object';
import {bool} from '@ember-decorators/object/computed';

export default class extends Component {
  name = '';

  @bool('name') isValidName;

  @on('didRender')
  focusOnInput() {
    this.$('.input').focus();
  }

  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  }

  @action
  onAddClickAction() {
    this.get('isValidName') && this.attrs.onAdd && this.attrs.onAdd(this.get('name'));
  }
}
