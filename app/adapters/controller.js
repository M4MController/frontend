import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlCreateRecord(store, type, snapshot) {
    return `/v2/controller/${snapshot.id}/activate`;
  }

  createRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlCreateRecord(store, type, snapshot), 'POST', this.serialize(snapshot));
  }
}
