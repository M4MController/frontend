import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const DefaultSensorValueAdapter = class extends ApplicationAdapter {
  _queryDataPeriod(sensorId, from, to) {
    if (from) {
      // we are living in Moscow
      from.setHours(from.getHours() + 3);

      // backend receives specific time format
      from = from.toISOString();
      from = from.slice(0, from.length - 5);
    }

    // the same with ending date
    if (to) {
      to.setHours(to.getHours() + 3);

      to = to.toISOString();
      to = from.slice(0, to.length - 5);
    }

    return this.ajax(`/v2/sensor/${sensorId}/get_data_period`, 'GET', {from, to});
  }

  _queryLimit(sensorId, limit) {
    return this.ajax(`/sensor/${sensorId}/get_data`, 'GET', {limit});
  }

  query(store, type, query) {
    if (query.limit) {
      return this._queryLimit(query.sensorId, query.limit);
    } else {
      return this._queryDataPeriod(query.sensorId, query.from, query.to);
    }
  }
};

const LiteSensorValueAdapter = class extends ApplicationAdapter {
  async query(store, type, query) {
    const response = await this.ajax(`/sensor/${query.sensorId}/data`, 'GET', {field: query.field});
    return {
      sensorId: query.sensorId,
      response,
    };
  }
};

export default IS_LITE_MODE ? LiteSensorValueAdapter : DefaultSensorValueAdapter;
