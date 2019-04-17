import DS from 'ember-data';
import {IS_LITE_MODE} from '../constants';

const DefaultApplicationSerializer = class extends DS.RESTSerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return super.normalizeFindAllResponse(store, primaryModelClass, payload['msg'], id, requestType);
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
