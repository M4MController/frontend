import DS from 'ember-data';
import {IS_LITE_MODE} from '../constants';

const DefaultApplicationSerializer = class extends DS.RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const normalized = payload['msg'];
    normalized.__internal = payload.__internal; // use this field to pass some values from adapter to serializer
    return super.normalizeResponse(store, primaryModelClass, normalized, id, requestType);
  }

  keyForAttribute(attr) {
    return attr.camelize();
  }

  payloadKeyFromModelName(modelName) {
    return modelName;
  }
};

const LiteApplicationSerializer = DS.RESTSerializer;

export default IS_LITE_MODE ? LiteApplicationSerializer : DefaultApplicationSerializer;
