import Route from '@ember/routing/route';
import {observes} from '@ember-decorators/object';

export default class extends Route {
  @observes('model.name')
  onObjectNameChange() {
    this.set('pageTitle', this.get('model.name'));
  }

  async model(params) {
    const objectId = params['object_id'];

    return await this.get('store').findRecord('object', objectId, {include: 'controllers,sensors'});
  }

  afterModel(model) {
    this.set('pageTitle', model.get('name'));
  }
}
