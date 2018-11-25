import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlCreateRecord() {
    return '/v2/object';
  }

  buildUrlDeleteRecord(store, type, snapshot) {
    return `/v2/object/${snapshot.id}`;
  }

  createRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlCreateRecord(store, type, snapshot), 'POST', this.serialize(snapshot));
  }

  deleteRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlDeleteRecord(store, type, snapshot), 'DELETE');
  }
}
