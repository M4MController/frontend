import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';

export default class extends Controller {
  @service auth;

  @action
  async onLogOutAction() {
    if (await this.get('auth').logOut()) {
      this.transitionToRoute('auth.log-in');
    }
  }
}
