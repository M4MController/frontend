import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    value: 'value',
    time: 'date',
    hash: 'hash',
    sensor: 'sensor_id',
  };

  serializeDate(dateString) {
    // may be better to use ember transform?
    const props = /(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/.exec(dateString);
    return new Date(props[1], props[2] - 1, props[3], props[4], props[5], props[6]);
  }

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    const data = payload['msg'].map((data) => ({
      id: `${data['hash']}${data['date']}${data['sensor_id']}`,
      type: 'sensor-value',
      attributes: {
        value: data['value'],
        date: this.serializeDate(data['date']),
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
