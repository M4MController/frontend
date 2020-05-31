import Controller from '@ember/controller';
import {action} from '@ember/object';
import {IS_LITE_MODE} from '../../../constants';

export default class extends Controller {
  @action
  async onSocialBind() {
    if (IS_LITE_MODE) {
      this.transitionToRoute('account.set-up.set-up-controller');
    } else {
      this.transitionToRoute('account.set-up.instruction');
    }
  }
}
