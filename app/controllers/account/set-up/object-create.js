import Controller from '@ember/controller';
import {action} from '@ember/object';
import {IS_LITE_MODE} from '../../../constants';

export default class extends Controller {
  objectName = '';

  @action
  async onObjectCreate(name) {
    this.set('isLoading', true);

    const object = (await this.get('store').findAll('object')).get('firstObject');
    object.set('name', name);
    await object.save();

    if (IS_LITE_MODE) {
      const controller = object.get('controllers.firstObject');
      controller.set('name', name);
      await controller.save();
    }

    this.transitionToRoute('account.set-up.social-binding');
    this.set('isLoading', false);
  }
}
