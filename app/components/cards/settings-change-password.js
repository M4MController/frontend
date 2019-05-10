import Component from '@ember/component';
import {action} from '@ember/object';
import {
  computed,
} from '@ember-decorators/object';

const MIN_PASSWORD_LENGTH = 4;

export default class extends Component {
  currentPassword = '';
  newPassword = '';
  newPasswordAgain = '';

  @computed('currentPassword', 'newPassword', 'newPasswordAgain')
  get canSave() {
    const currentNotEmpty = this.get('currentPassword.length');
    const lengthCheck = this.get('newPassword.length') >= MIN_PASSWORD_LENGTH;
    const areEqual = this.get('newPassword') === this.get('newPasswordAgain');

    return currentNotEmpty && lengthCheck && areEqual;
  }

  @action
  saveBtnClick() {
    if (!this.attrs.onSave || !this.get('canSave')) return;

    if (!this.attrs.onSave(this.get('newPassword'))) {
      // if successfully saved
      this.set('currentPassword', '');
      this.set('newPassword', '');
      this.set('newPasswordAgain', '');
    }
  }
}
