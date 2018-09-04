import Controller from '@ember/controller';
import {action} from '@ember-decorators/object';

export default class extends Controller {
  @action
  updateProfileInfoAction({newFullName, newMobilePhone, newEmail}) {
    const user = this.get('model.user');
    const [newFamilyName, newSecondName] = newFullName.split(' ');

    user.set('familyName', newFamilyName);
    user.set('secondName', newSecondName);
    user.set('mobilePhone', newMobilePhone);
    user.set('email', newEmail);

    user.save();
  }

  @action
  updatePasswordAction() {
  }
}
