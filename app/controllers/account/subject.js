import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';
import {openModal} from '../../helpers/open-modal';

export default class extends Controller {
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
  afterControllerAdded(controller) {
    openModal('sensors-add', {
      sensors: controller.get('sensors'),
      onSuccess: () => openModal('sensors-add', {sensors: controller.get('sensors')}),
    });
  }
}
