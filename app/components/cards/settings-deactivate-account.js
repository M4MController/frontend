import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  @action
  deactivateBtnClickAction() {
    this.attrs.onDeactivate && this.attrs.onDeactivate();
  }
}
