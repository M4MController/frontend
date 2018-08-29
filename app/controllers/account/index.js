import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  modalAddVisible = false;
  modalAddLoading = false;

  @action
  async onAddObjectAction(name) {
    this.set('modalAddLoading', true);
    const object = this.get('store').createRecord('object', {name});
    await object.save();

    this.set('modalAddVisible', false);
    this.set('modalAddLoading', false);
  }
}
