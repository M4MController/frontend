import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  modalAddVisible = false;
  modalAddLoading = false;

  // Better to do in modal dialog?
  bShowAddObject = false;

  @action
  showAddObject() {
    this.set('bShowAddObject', true);
  }

  @action
  hideAddObject() {
    this.set('bShowAddObject', false);
  }

  @action
  async onAddObjectAction(name) {
    this.set('modalAddLoading', true);
    const object = this.get('store').createRecord('object', {name});
    await object.save();

    this.set('modalAddVisible', false);
    this.set('modalAddLoading', false);
  }
}
