import Component from '@ember/component';
import {action} from '@ember-decorators/object';

export default class extends Component {
  defaultAttrs = {
    type: 'text',
  };

  @action
  onEnterAction(...args) {
    this.attrs.onEnterAction && this.attrs.onEnterAction(...args);
  }

  @action
  focusOutAction() {
    this.set('wasFocused', true);
  }
}
