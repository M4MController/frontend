import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    return {
      user: (await this.get('store').findRecord('user', 1)),
      objects: await this.get('store').findAll('object'),
    };
  }
}
