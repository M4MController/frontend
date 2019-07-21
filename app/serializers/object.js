import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    address: 'addres',
    user: 'user_id',
  };

  serialize(snapshot, options) {
    return {
      'name': snapshot.attr('name'),
      'address': snapshot.attr('address') || '',
    };
  }

  normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalize(primaryModelClass, payload);
  }
}
