import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Finances';

  model({'object_id': objectId}) {
    return this.get('store').peekRecord('object', objectId);
  }
}
