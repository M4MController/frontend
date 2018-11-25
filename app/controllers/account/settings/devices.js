import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  @action
  async onControllerDeleteAction(controller) {
    try {
      controller.deleteRecord();
      await controller.save();

      // a controller with the same identifier may be activated in the same browser session in the future.
      // we must unload the record, not to get an Ember error on controller creation (in fact, activation).
      controller.unloadRecord();
    } catch (e) {
      alert(`Не могу удалить объект: ${e.toString()}`);
    }
  }
}
