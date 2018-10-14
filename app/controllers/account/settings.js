import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  @action
  updateProfileInfoAction({newFullName, newMobilePhone, newEmail}) {
    const user = this.get('model.user');
    const [newfirstName, newlastName] = newFullName.split(' ');

    user.set('firstName', newfirstName);
    user.set('lastName', newlastName);
    user.set('mobilePhone', newMobilePhone);
    user.set('email', newEmail);

    user.save();
  }

  @action
  updatePasswordAction() {
  }

  @action
  deactivateAccountAction() {
    // todo:
    alert('stub');
  }
}
