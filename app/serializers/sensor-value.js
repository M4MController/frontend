import ApplicationSerializer from './application';

const generateId = function(data) {
  return `${data['hash']}${data['date'] || data['data']['timestamp']}${data['sensor_id']}`;
};

export default class extends ApplicationSerializer {
  attrs = {
    data: 'data',
    hash: 'hash',
    sensor: 'sensor',
  };

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    payload.forEach((data) => {
      data['id'] = generateId(data);
      data['sensor'] = payload.__internal.sensorId;
    });
    return super.normalizeFindAllResponse(store, primaryModelClass, {'sensor-value': payload}, id, requestType);
  }
}
