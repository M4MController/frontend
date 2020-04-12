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

const DefaultSensorValueAdapter = class extends ApplicationAdapter {
  async _queryDataPeriod(sensorId, from, to) {
    if (from) {
      from = formatDateTime(from);
    }

    // the same with ending date
    if (to) {
      to = formatDateTime(to);
    }

    return this.ajax(`/v2/sensor/${sensorId}/get_data_period`, 'GET', {from, to});
  }

  _queryLimit(sensorId, limit) {
    return this.ajax(`/sensor/${sensorId}/get_data`, 'GET', {limit});
  }

  async query(store, type, query) {
    let response;
    if (query.limit) {
      response = await this._queryLimit(query.sensorId, query.limit);
    } else {
      response = await this._queryDataPeriod(query.sensorId, query.from, query.to);
    }
    addSensorId(query.sensorId, response);
    return response;
  }
};

const LiteSensorValueAdapter = class extends ApplicationAdapter {
  async query(store, type, query) {
    const response = await this.ajax(`/sensor/${query.sensorId}/data`, 'GET', {
      field: query.field,
      from: formatDateTime(query.from),
      limit: query.limit
    });
    addSensorId(query.sensorId, response);
    return response;
  }
};

export default IS_LITE_MODE ? LiteSensorValueAdapter : DefaultSensorValueAdapter;
