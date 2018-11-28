import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    return {
      user: (await this.get('store').peekRecord('user', 1)),
      objects: await this.get('store').findAll('object'),
    };
  }
}
