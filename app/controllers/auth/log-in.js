import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';

export default class extends Controller {
  @service auth;

  isLoading = false;
  logInError = '';

  @action
  async onLogInAction(username, password) {
    this.set('isLoading', true);
    if (await this.get('auth').logIn(username, password)) {
      this.set('logInError', '');
      this.transitionToRoute('account.index');
    } else {
      this.set('logInError', 'Invalid username or password. Try admin/admin.');
    }
    this.set('isLoading', false);
  }
}
