import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  modalAddVisible = false;
  modalAddLoading = false;

  bShowAddController = false;

  @action
  showAddController() {
    this.set('bShowAddController', true);
  }

  @action
  hideAddController() {
    this.set('bShowAddController', false);
  }

  @action
  async addControllerAction(macAddress) {
    this.set('modalAddLoading', true);
    const controller = this.get('store').createRecord('controller', {
      name: macAddress,
      object: this.get('model'),
    });
    await controller.save();

    // todo: remove the following
    /* TEST DATA */
    for (let i = 0; i < 6; ++i) {
      await this.get('store').createRecord('sensor', {
        name: `sensor ${i + 1}`,
        controller,
      }).save();
    }

    this.set('modalAddVisible', false);
    this.set('modalAddLoading', false);
  }
}
