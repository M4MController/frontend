import Controller from '@ember/controller';
import {action} from '@ember/object';
import {IS_LITE_MODE} from '../../../constants';

export default class extends Controller {
  token = '';

  @action
  async onSocialBind(token) {
    this.set('isLoading', true);
    if (token) {
      const social = await this.get('store').findRecord('user-social-token', 1);
      social.set('yandexDisk', token);
      await social.save();

      if (IS_LITE_MODE) {
        this.transitionToRoute('account.set-up.setup-key');
      } else {
        this.transitionToRoute('account.set-up.instruction');
      }
    } else { // if user skipped this step
      if (IS_LITE_MODE) {
        this.set('objects', await this.get('store').findAll('object'));
        this.transitionToRoute('account.set-up.set-up-controller');
      } else {
        this.transitionToRoute('account.set-up.instruction');
      }
    }
    this.set('isLoading', false);
  }
}
