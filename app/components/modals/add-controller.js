import Component from '@ember/component';
import {
  action,
} from '@ember-decorators/object';

export default class extends Component {
  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  }

  @action
  onSubmitAction(controllerAttrs) {
    this.attrs.onAdd && this.attrs.onAdd(controllerAttrs);
  }
}
