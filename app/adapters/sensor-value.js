import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  query(store, type, query, recordArray) {
    return this.ajax(`/v2/sensor/${query.sensorId}/get_data_period`, 'GET', {
      from: query.from,
      to: query.to,
    });
  }
}
