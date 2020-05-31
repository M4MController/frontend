import Controller from '@ember/controller';
import {action} from '@ember/object';

export default class extends Controller {
  key = '';

  @action
  async onKeyEntered(key) {
    if (!key) {
      return;
    }

    this.set('isLoading', true);

    const user = this.get('store').peekRecord('user', 1);
    user.set('encryptionKey', key);
    await user.save();

    this.set('isLoading', false);
    this.transitionToRoute('account.set-up.set-up-controller');
  }
}
