import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Объекты';

  model() {
     return this.get('store').peekAll('object');
  }
}
