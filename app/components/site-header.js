import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  bShowSideMenu = false;

  @action
  onLogOutAction() {
    this.attrs.onLogOut && this.attrs.onLogOut();
  }

  @action
  showSideMenu() {
    this.set('bShowSideMenu', true);
  }

  @action
  hideSideMenu() {
    this.set('bShowSideMenu', false);
  }

}
