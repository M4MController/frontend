import Controller from '@ember/controller';
import {action} from '@ember/object';

export default class extends Controller {
  @action
  async onSetupLocalAction() {
    this.transitionToRoute('account.index');
  }

  @action
  async onSetupM4MAction() {
    this.transitionToRoute('auth.sign-up');
  }
}
