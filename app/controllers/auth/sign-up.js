import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class extends Controller {
  @service auth;
  @service store;

  key = '';

  isLoading = false;
  logInError = '';

  object = null;

  @action
  async onSignUpAction(...args) {
    this.set('isLoading', true);
    if (await this.get('auth').signUp(...args)) {
      this.transitionToRoute('account.set-up.object-create');
    } else {
      this.set('signUpError', 'Invalid username or password. Try admin/admin.');
    }
    this.set('isLoading', false);
  }
}
