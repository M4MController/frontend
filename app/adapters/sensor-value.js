import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  query(store, type, query, recordArray) {
    let from; let to;
    if (query.from) {
      // we are living in Moscow
      query.from.setHours(query.from.getHours() + 3);

      // backend receives specific time format
      from = query.from.toISOString();
      from = from.slice(0, from.length - 5);
    }

    // the same with ending date
    if (query.to) {
      query.to.setHours(query.to.getHours() + 3);

      to = query.to.toISOString();
      to = from.slice(0, to.length - 5);
    }

    return this.ajax(`/v2/sensor/${query.sensorId}/get_data_period`, 'GET', {from, to});
  }
}
