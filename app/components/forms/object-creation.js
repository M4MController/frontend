import Component from '@ember/component';
import {action} from '@ember/object';
import {
  computed,
  on,
} from '@ember-decorators/object';

export default class extends Component {
  name = '';

  @computed('name')
  get nameError() {
    return !this.get('name.length') && 'Поле не должно быть пустым';
  }

  @computed('nameError')
  get isValid() {
    return !this.get('nameError');
  }

  @on('didRender')
  focusOnInput() {
    this.$('.input').focus();
  }

  @action
  onCloseAction() {
    this.attrs.onClose && this.attrs.onClose();
  }

  @action
  onSubmitAction() {
    this.get('isValid') && this.attrs.onSubmit && this.attrs.onSubmit({
      name: this.get('name'),
    });
  }
}
