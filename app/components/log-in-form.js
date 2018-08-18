import Component from '@ember/component';
import {
  action,
  computed,
} from '@ember-decorators/object';

export default class extends Component {
  username = '';
  password = '';

  // error = '';

  @computed('username', 'password')
  get isValid() {
    const username = this.get('username');
    const password = this.get('password');

    return username.length && password.length;
  }

  @action
  onLoginClickAction() {
    this.get('isValid') && this.attrs.onLogIn && this.attrs.onLogIn(this.get('username'), this.get('password'));
  }
}
