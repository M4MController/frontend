import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  showAddModal = true;

  @action
  async onAddObjectAction(name) {
    const object = this.get('store').createRecord('object', {name});
    await object.save();
    this.set('showAddModal', false);
  }
}
