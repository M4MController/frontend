import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Мои устройства';

  model() {
    return {
      controllers: this.get('store').peekAll('controller'),
    };
  }
}
