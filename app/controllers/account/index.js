import Controller from '@ember/controller';
import {action} from '@ember/object';

export default class extends Controller {
  @action
  async afterObjectCreated(object) {
    this.transitionToRoute('account.subject', object.get('id'));
  }
}
