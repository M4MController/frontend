import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  isDropDownOpened = false;

  @action
  onClickAction() {
    this.toggleProperty('isDropDownOpened');
  }
}
