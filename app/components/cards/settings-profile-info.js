import Component from '@ember/component';
import {
  action,
} from '@ember-decorators/object';

export default class extends Component {
  user;
  oldPassword;
  newPassword;
  repPassword;

  personalDataOK = false;
  contactDataOK = false;
  passwordChangeOK = false;

  @action
  savePersonalData() {
    this.set('personalDataOK', true);
  }

  @action
  saveContactData() {
    this.set('contactDataOK', true);
  }

  @action
  changePassword() {
    this.set('passwordChangeOK', true);
  }

  /*
  @on('didReceiveAttrs')
  initInputFields() {
    this.set('fullName', this.get('user.fullName'));
    this.set('mobilePhone', this.get('user.mobilePhone'));
    this.set('email', this.get('user.email'));
  }

  @computed(
    'fullName', 'mobilePhone', 'email',
    'user.fullName', 'user.mobilePhone', 'user.email',
  )
  get canSave() {
    const fullName = this.get('fullName');
    const userFullName = this.get('user.fullName');
    const mobilePhone = this.get('mobilePhone');
    const userMobilePhone = this.get('user.mobilePhone');
    const email = this.get('email');
    const userEmail = this.get('user.email');

    const notEmpty = fullName && mobilePhone && email;
    const notEqual = fullName !== userFullName || mobilePhone !== userMobilePhone || email !== userEmail;

    return notEmpty && notEqual;
  }

  @action
  saveBtnClickAction() {
    if (!this.get('canSave')) return;

    this.attrs.onSave && this.attrs.onSave({
      newFullName: this.get('fullName'),
      newMobilePhone: this.get('mobilePhone'),
      newEmail: this.get('email'),
    });
  }
  */
}
