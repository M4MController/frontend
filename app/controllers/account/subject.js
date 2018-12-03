import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  bShowAddController = false;
  bLoadingAddController = false;

  bShowSensorsAddition = false;
  bLoadingSensorsAddition = false;

  sensorsForAddition;

  @action
  showAddController() {
    this.set('bShowAddController', true);
  }

  @action
  hideAddController() {
    this.set('bShowAddController', false);
  }

  @action
  async onDeleteObjectAction(object) {
    try {
      object.deleteRecord();
      await object.save();
      this.transitionToRoute('account.index');
    } catch (e) {
      alert(`Не могу удалить объект: ${e.toString()}`);
    }
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

      // todo: remove the stub
      this.set('sensorsForAddition', controller.get('sensors'));
      this.set('bShowSensorsAddition', true);
    } catch (e) {
      alert('Не удаётся активировать контроллер с данным идентификатором');
    }

    this.set('bLoadingAddController', false);
  }

  @action
  onAddSensorsAction() {
    this.set('bLoadingSensorsAddition', true);
    // setTimeout(() => {
      this.set('bShowSensorsAddition', false);
      this.set('bLoadingSensorsAddition', false);
    // }, 1500);
  }
}
