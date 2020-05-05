import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    yandexDisk: 'yandex_disk',
  };

  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      'user-social-token': Object.assign(payload, {id: 1}),
    };
    return super.normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType);
  }
}
