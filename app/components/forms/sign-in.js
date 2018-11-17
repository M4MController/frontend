import Component from '@ember/component';
import {
  action,
  computed,
} from '@ember-decorators/object';

const minPasswordLength = 4;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class extends Component {
  username = '';
  password = '';

  @computed('username')
  get usernameError() {
    const username = this.get('username');

    if (username.length === 0) {
      return 'Введите электронную почту';
    }

    if (!emailRegex.test(username)) {
      return 'Это не адрес электронной почты';
    }

    return undefined;
  }

  @computed('password')
  get passwordError() {
    const password = this.get('password');

    if (password.length === 0) {
      return 'Введите пароль';
    }

    if (password.length < minPasswordLength) {
      return `Пароль не может быть короче ${minPasswordLength} символов`;
    }

    return undefined;
  }

  @computed('usernameError', 'passwordError')
  get isValid() {
    return !this.get('usernameError') && !this.get('passwordError');
  }

  @action
  onLoginClickAction() {
    this.get('isValid') && this.attrs.onLogIn && this.attrs.onLogIn(this.get('username'), this.get('password'));
  }
}
