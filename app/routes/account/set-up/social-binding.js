import Route from '@ember/routing/route';
import {action} from '@ember/object';
import {on} from '@ember-decorators/object';
import {IS_LITE_MODE} from '../../../constants';

export default class extends Route {
  @on('activate')
  bind() {
    const hash = window.location.hash.substr(1);

    const result = hash.split('&').reduce(function(result, item) {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    const token = result['access_token'];
    if (token) {
      this.onSocialBind(token);
    }
  }

  @action
  async onSocialBind(token) {
    const controller = this.controllerFor('account.set-up.social-binding');
    controller.set('isLoading', true);
    if (token) {
      const social = await this.get('store').findRecord('user-social-token', 1);
      social.set('yandexDisk', token);
      await social.save();

      if (IS_LITE_MODE) {
        this.transitionTo('account.set-up.setup-key');
      } else {
        this.transitionTo('account.set-up.instruction');
      }
    } else { // if user skipped this step
      if (IS_LITE_MODE) {
        this.transitionTo('account.set-up.set-up-controller');
      } else {
        this.transitionTo('account.set-up.instruction');
      }
    }
    controller.set('isLoading', false);
  }
}
