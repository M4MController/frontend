import Controller from '@ember/controller';
import {action, computed} from '@ember-decorators/object';

export default class extends Controller {
  bShowAddController = false;
  bLoadingAddController = false;

  bShowSensorsActivation = false;
  bLoadingSensorsActivation = false;

  bShowSensorsAddition = false;
  bLoadingSensorsAddition = false;

  controllerForSensorsActivation;

  // todo: remove the stub
  @computed('model.sensors')
  get sensorsForAddition() {
    return this.get('model.sensors').slice(0, 4);
  }

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

      // todo: remove the stub
      this.set('controllerForSensorsActivation', this.get('store').peekAll('sensor'));
      this.set('bShowSensorsActivation', true);
    } catch (e) {
      alert('Не удаётся активировать контроллер с данным идентификатором');
    }

    this.set('bLoadingAddController', false);
  }

  @action
  onActivateSensorsAction() {
    this.set('bLoadingSensorsActivation', true);
    setTimeout(() => {
      this.set('bShowSensorsActivation', false);
      this.set('bLoadingSensorsActivation', false);
    }, 1500);
  }

  @action
  onAddSensorsAction() {
    this.set('bLoadingSensorsAddition', true);
    setTimeout(() => {
      this.set('bShowSensorsAddition', false);
      this.set('bLoadingSensorsAddition', false);
    }, 1500);
  }
}
