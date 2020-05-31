import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Объекты';

  async model() {
    return {
      user: this.get('store').peekAll('user').get('firstObject'),
      objects: await this.get('store').findAll('object', {reload: true}),
    };
  }
}
