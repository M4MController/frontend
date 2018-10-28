import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  query(store, type, query, recordArray) {
    return this.ajax(`/sensor/${query.sensorId}/get_data`, 'GET');
  }
}
