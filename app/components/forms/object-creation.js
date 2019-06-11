import Component from '@ember/component';
import {action} from '@ember/object';
import {
  computed,
} from '@ember/object';
import {
  on,
} from '@ember-decorators/object';
import {run} from '@ember/runloop';

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
    run(() => {
      this.element.querySelector('.input').focus();
    });
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
