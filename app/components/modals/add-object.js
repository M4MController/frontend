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
  onSubmitAction(objectAttrs) {
    this.attrs.onAdd && this.attrs.onAdd(objectAttrs);
  }
}
