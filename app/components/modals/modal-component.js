import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  cover = true;

  @action
  onCloseButtonClickAction() {
    this.attrs.onClose && this.attrs.onClose();
  }
}
