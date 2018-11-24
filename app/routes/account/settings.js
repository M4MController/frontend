import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Settings';

  async model() {
    return {
      user: this.get('store').peekAll('user').get('firstObject'),
    };
  }
}
