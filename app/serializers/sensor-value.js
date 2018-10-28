import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    value: 'value',
    timestamp: 'date',
    hash: 'hash',
    sensor: 'sensor_id',
  };

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    const data = payload['msg'].map((data) => ({
      id: data['hash'] + data['date'] + data['sensor_id'],
      type: 'sensor-value',
      attributes: {
        value: data['value'],
        timestamp: data['date'],
        hash: data['hash'],
      },
      relationships: {
        sensor: {
          data: {
            type: 'sensor',
            id: data['sensor_id'],
          },
        },
      },
    }));
    return {data};
  }
}
