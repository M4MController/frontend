import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Objects';

  model() {
     return this.get('store').peekAll('object');
  }
}
