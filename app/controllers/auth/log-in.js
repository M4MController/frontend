import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember-decorators/service';
import {IS_LITE_MODE} from '../../constants';

export default class extends Controller {
  @service auth;

  isLoading = false;
  logInError = '';

  supportRegistration = IS_LITE_MODE;

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
