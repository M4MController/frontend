import Controller from '@ember/controller';
import {action} from '@ember/object';

export default class extends Controller {
  @action
  onCarClick() {
    this.transitionToRoute('account.subject', this.get('model.sensors.firstObject.controller.object.id'));
  }
}
