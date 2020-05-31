import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    return {
      object: await this.get('store').findAll('object'),
    };
  }
}
