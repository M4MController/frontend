import ApplicationSerializer from './application';
import {IS_LITE_MODE} from '../constants';

const generateId = function(data) {
  return `${data['hash']}${data['date'] || data['time_stamp']}${data['sensor_id']}`;
};

const BaseSensorValueSerializer = class extends ApplicationSerializer {
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    payload.forEach((data) => {
      data['id'] = generateId(data);
      data['sensor'] = payload.__internal.sensorId;
    });
    return super.normalizeFindAllResponse(store, primaryModelClass, {'sensor-value': payload}, id, requestType);
  }
};

const DefaultSensorValueSerializer = class extends BaseSensorValueSerializer {
  attrs = {
    value: 'value',
    timestamp: 'date',
    hash: 'hash',
    sensor: 'sensor',
  };
};

const LiteSensorValueSerializer = class extends BaseSensorValueSerializer {
  attrs = {
    value: 'value',
    timestamp: 'time_stamp',
    hash: 'hash',
    sensor: 'sensor',
  };
};

export default IS_LITE_MODE ? LiteSensorValueSerializer : DefaultSensorValueSerializer;
