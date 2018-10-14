import DS from 'ember-data';

export default class extends DS.RESTSerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return super.normalizeFindAllResponse(store, primaryModelClass, payload['msg'], id, requestType);
  }

  keyForAttribute(attr) {
    return attr.camelize();
  }

  payloadKeyFromModelName(modelName) {
    return modelName;
  }
}
