import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  bShowAddObject = false;
  bLoadingAddObject = false;

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
    this.set('bLoadingAddObject', true);

    const object = this.get('store').createRecord('object', {name});
    try {
      await object.save();
      this.set('bShowAddObject', false);
    } catch (e) {
      alert('Ошибка создания объекта.');
    }

    this.set('bLoadingAddObject', false);
  }
}
