import Component from '@ember/component';
import {
  action,
  computed,
  on,
} from '@ember-decorators/object';

export default class extends Component {
  controllerId = '';
  controllerName = '';

  @on('didRender')
  focusOnInput() {
    this.$('.input').focus();
  }

  @computed('controllerId')
  get controllerIdError() {
    const controllerId = this.get('controllerId');
    return !+controllerId && 'Должно быть числом';
  }

  @computed('controllerName')
  get controllerNameError() {
    const controllerNameLength = this.get('controllerName.length');
    return !controllerNameLength && 'Это поле не должно быть пустым';
  }

  @computed('controllerIdError', 'controllerNameError')
  get isValid() {
    return !this.get('controllerIdError') && !this.get('controllerNameError');
  }

  @action
  onSubmitAction() {
    this.get('isValid') && this.attrs.onSubmit && this.attrs.onSubmit({
      id: this.get('controllerId'),
      name: this.get('controllerName'),
    });
  }
}
