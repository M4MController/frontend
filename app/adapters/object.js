import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlCreateRecord() {
    return '/v2/object';
  }

  createRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlCreateRecord(store, type, snapshot), 'POST', this.serialize(snapshot));
  }
}
