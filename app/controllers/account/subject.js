import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  showAddModal = true;

  @action
  async addControllerAction(macAddress) {
    const obj = this.get('model');
    const controller = this.get('store').createRecord('controller', {
      name: macAddress,
      object: this.get('model'),
    });
    await controller.save();
    this.set('showAddModal', false);
  }
}
