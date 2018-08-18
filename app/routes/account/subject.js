import Route from '@ember/routing/route';

export default class extends Route {
  async model(params) {
    const objectId = params['object_id'];

    return await this.get('store').findRecord('object', objectId, {include: 'controllers,sensors'});
  }
}
