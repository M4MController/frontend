import Component from '@ember/component';
import {
  action,
  computed,
} from '@ember-decorators/object';

const minPasswordLength = 4;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class extends Component {
  username = '';
  fio = '';
  password = '';
  passwordRepeat = '';

  @computed('username')
  get usernameError() {
    const username = this.get('username');

    if (!username.length) {
      return 'Поле не может быть пустым';
    }

    if (!emailRegex.test(username)) {
      return 'Это не адрес электронной почты';
    }

    return undefined;
  }

  @computed('fio')
  get fioError() {
    const fio = this.get('fio');

    if (!fio.length) {
      return 'Поле не может быть пустым';
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

  @computed('password', 'passwordRepeat')
  get passwordRepeatError() {
    const password = this.get('password');
    const passwordRepeat = this.get('passwordRepeat');

    if (passwordRepeat.length === 0) {
      return 'Повторите ввод пароля';
    }

    if (passwordRepeat !== password) {
      return `Пароли не совпадают`;
    }

    return undefined;
  }

  @computed('usernameError', 'fioError', 'passwordError', 'passwordRepeatError')
  get isValid() {
    return !this.get('usernameError') && !this.get('fioError') && !this.get('passwordError') && !this.get('passwordRepeatError');
  }

  @action
  onRegisterClickAction() {
    const fio = this.get('fio').split(' ');
    const lastName = fio[0];
    const firstName = fio[1] ? fio[1] : '';
    const middleName = fio[2] ? fio[2] : '';

    this.get('isValid') && this.attrs.onSignUp && this.attrs.onSignUp({
      username: this.get('username'),
      lastName,
      firstName,
      middleName,
      password: this.get('password'),
    });
  }
}
