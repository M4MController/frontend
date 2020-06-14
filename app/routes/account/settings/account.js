import Route from '@ember/routing/route';
import {on} from '@ember-decorators/object';

export default class extends Route {
  pageTitle = 'Мой профиль';

  async model() {
    const store = this.get('store');
    return {
      user: await store.findRecord('user', 1),
      socialTokens: await store.findRecord('user-social-token', 1),
    };
  }

  @on('activate')
  async bind() {
    const hash = window.location.hash.substr(1);

    const result = hash.split('&').reduce(function(result, item) {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});
    const token = result['access_token'];
    if (token) {
      const social = await this.get('store').findRecord('user-social-token', 1);
      social.set('yandexDisk', token);
      await social.save();
    }
  }
}
