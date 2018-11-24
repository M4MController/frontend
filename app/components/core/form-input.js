import Component from '@ember/component';
import {
  action,
  computed,
} from '@ember-decorators/object';

export default class extends Component {
  defaultAttrs = {
    type: 'text',
  };

  wasFocused = false;

  @computed('error')
  get isValid() {
    return !this.get('error.length');
  }

  @computed('isValid', 'wasFocused')
  get showErrorMessage() {
    return this.get('wasFocused') && !this.get('isValid');
  }

  @action
  onEnterAction(...args) {
    this.attrs.onEnterAction && this.attrs.onEnterAction(...args);
  }

  @action
  focusOutAction() {
    this.set('wasFocused', true);
  }
}
