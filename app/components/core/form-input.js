import Component from '@ember/component';
import {action} from '@ember/object';
import {
  computed,
} from '@ember/object';
import {
  observes,
  on,
} from '@ember-decorators/object';

export default class extends Component {
  defaultAttrs = {
    type: 'text',
  };

  wasFocused = false;
  localValue = '';

  @computed('error')
  get isValid() {
    return !this.get('error.length');
  }

  @computed('isValid', 'wasFocused')
  get showErrorMessage() {
    return this.get('wasFocused') && !this.get('isValid');
  }

  @on('didReceiveAttrs')
  copyValue() {
    this.set('localValue', this.get('value'));
  }

  @observes('localValue')
  changeValue() {
    this.set('value', this.get('localValue').trim());
  }

  @action
  onEnterAction(...args) {
    this.attrs.onEnterAction && this.attrs.onEnterAction(...args);
  }

  @action
  focusOutAction() {
    this.set('localValue', this.get('localValue').trim());
    this.set('wasFocused', true);
  }
}
