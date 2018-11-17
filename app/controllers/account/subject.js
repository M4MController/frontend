import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  bShowAddController = false;
  bLoadingAddController = false;

  @action
  showAddController() {
    this.set('bShowAddController', true);
  }

  @action
  hideAddController() {
    this.set('bShowAddController', false);
  }

  @action
  async onAddControllerAction(controllerAttrs) {
    const existingController = this.get('store').peekRecord('controller', controllerAttrs.id);
    if (existingController && existingController.get('object')) {
      alert('Этот контроллер уже активирован');
      return;
    }

    this.set('bLoadingAddController', true);
    const controller = this.get('store').createRecord('controller', {
      id: controllerAttrs.id,
      name: controllerAttrs.name,
      object: this.get('model'),
    });

    try {
      await controller.save();
      this.set('bShowAddController', false);
    } catch (e) {
      alert('Не удаётся активировать контроллер с данным идентификатором');
    }

    this.set('bLoadingAddController', false);
  }
}
