import ApplicationSerializer from './application';
import {IS_LITE_MODE} from '../constants';

const serializeDate = function(dateString) {
  // may be better to use ember transform?
  const date = new Date(dateString);
  if (!date.getDate()) {
    const props = /(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/.exec(dateString);
    return new Date(props[1], props[2] - 1, props[3], props[4], props[5], props[6]);
  } else {
    return date;
  }
};

const generateId = function(data) {
  return `${data['hash']}${data['date']}${data['sensor_id']}`
};

const DefaultSensorValueSerializar = class extends ApplicationSerializer {
  attrs = {
    value: 'value',
    time: 'date',
    hash: 'hash',
    sensor: 'sensor_id',
  };

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    const data = payload['msg'].map((data) => ({
      id: generateId(data),
      type: 'sensor-value',
      attributes: {
        value: JSON.parse(data['value']),
        date: serializeDate(data['date']),
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
};

const LiteSensorValueSerializer = class extends ApplicationSerializer {
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    const data = payload.response.map((data) => ({
      id: generateId(data),
      type: 'sensor-value',
      attributes: {
        value: typeof data['value'] === 'string' ? JSON.parse(data['value']) : data['value'],
        date: serializeDate(data['date']),
        hash: data['hash'],
      },
      relationships: {
        sensor: {
          data: {
            type: 'sensor',
            id: payload.sensorId,
          },
        },
      },
    }));
    return {data};
  }
};

export default IS_LITE_MODE ? LiteSensorValueSerializer : DefaultSensorValueSerializar;
