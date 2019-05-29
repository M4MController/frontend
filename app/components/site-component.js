import Component from '@ember/component';
import {action} from '@ember/object';

export default class extends Component {
  @action
  onLogOutAction() {
    this.attrs.onLogOut && this.attrs.onLogOut();
  }
}
