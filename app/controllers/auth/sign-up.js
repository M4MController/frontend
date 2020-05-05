import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {IS_LITE_MODE} from '../../constants';

export default class extends Controller {
  @service auth;

  isLoading = false;
  logInError = '';

  setupStep = false;
  success = false

  object = null;

  @action
  async onSignUpAction(...args) {
    this.set('isLoading', true);
    if (await this.get('auth').signUp(...args)) {
      this.set('signUpError', '');
      if (IS_LITE_MODE) {
        this.set('setupStep', true);
        this.set('objects', await this.get('store').findAll('object'));
      } else {
        this.transitionToRoute('account.index');
      }
    } else {
      this.set('signUpError', 'Invalid username or password. Try admin/admin.');
    }
    this.set('isLoading', false);
  }
}
