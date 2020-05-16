import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return super.normalizeFindAllResponse(store, primaryModelClass, {'company': payload}, id, requestType);
  }
}
