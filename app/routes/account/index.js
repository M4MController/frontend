import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Объекты';

  model() {
    return {
      user: this.get('store').peekAll('user').get('firstObject'),
      objects: this.get('store').peekAll('object'),
    };
  }
}
