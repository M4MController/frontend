import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  @action
  onLogOutAction() {
    this.attrs.onLogOut && this.attrs.onLogOut();
  }
}
