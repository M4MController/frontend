import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    macAddress: 'mac',
    deactivationDate: 'deactivation_date',
    controllerType: 'controller_type',
    object: 'object_id',
    activationDate: 'activation_date',
    meta: 'meta',
    status: 'status',
  };

  serialize(snapshot, options) {
    return {
      'name': snapshot.attr('name'),
      'meta': snapshot.attr('meta') || '',
      'object_id': +snapshot.belongsTo('object').id,
    };
  }

  normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalize(primaryModelClass, payload['msg']);
  }
}
