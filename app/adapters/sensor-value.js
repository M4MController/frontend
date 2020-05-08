import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const addSensorId = function(sensorId, payload) {
  payload.__internal = {sensorId};
};

const formatDateTime = function(dateTime) {
  if (!dateTime) return undefined;
  // we are living in Moscow
  dateTime.setHours(dateTime.getHours() + 3);

  // backend receives specific time format
  dateTime = dateTime.toISOString();
  dateTime = dateTime.slice(0, dateTime.length - 5);
  return dateTime;
};

const LiteSensorValueAdapter = class extends ApplicationAdapter {
  async query(store, type, query) {
    const response = await this.ajax(`/sensor/${query.sensorId}/data`, 'GET', {
      field: query.field,
      from: formatDateTime(query.from),
      limit: query.limit,
    });
    addSensorId(query.sensorId, response);
    return response;
  }
};

export default IS_LITE_MODE ? LiteSensorValueAdapter : ApplicationAdapter;
