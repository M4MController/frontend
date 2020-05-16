import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {IS_LITE_MODE} from '../../constants';

export default class extends Controller {
  @service auth;
  @service store;

  objectName = '';
  key = '';
  token = '';

  isLoading = false;
  logInError = '';

  object = null;

  @action
  async onSignUpAction(...args) {
    this.set('isLoading', true);
    if (await this.get('auth').signUp(...args)) {
      this.set('signUpError', 'create-object');
      this.set('step', 'object-create');
    } else {
      this.set('signUpError', 'Invalid username or password. Try admin/admin.');
    }
    this.set('isLoading', false);
  }

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

    this.set('step', 'social-binding');
    this.set('isLoading', false);
  }

  @action
  async onSocialBind(token) {
    this.set('isLoading', true);
    if (token) {
      const social = await this.get('store').findRecord('user-social-token', 1);
      social.set('yandexDisk', token);
      await social.save();

      if (IS_LITE_MODE) {
        this.set('step', 'setup-key');
      } else {
        this.set('step', 'instruction');
      }
    } else { // if user skipped this step
      if (IS_LITE_MODE) {
        this.set('objects', await this.get('store').findAll('object'));
        this.set('step', 'setup');
      } else {
        this.set('step', 'instruction');
      }
    }
    this.set('isLoading', false);
  }

  @action
  async onKeyEntered(key) {
    if (!key) {
      return;
    }

    this.set('isLoading', true);

    const user = this.get('store').peekRecord('user', 1);
    user.set('encryptionKey', key);
    await user.save();

    this.set('objects', await this.get('store').findAll('object'));

    this.set('isLoading', false);
    this.set('step', 'setup');
  }

  @action
  onAccountGoClick() {
    this.set('step', null);
    this.transitionToRoute('account.index');
  }
}
