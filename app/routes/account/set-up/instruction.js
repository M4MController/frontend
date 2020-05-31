import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    return {
      token: (await this.get('store').findAll('user-social-token')).get('firstObject.yandexDisk'),
    };
  }
}
