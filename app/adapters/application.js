import DS from 'ember-data';
import {inject as service} from '@ember/service';

export default class extends DS.Adapter {
  @service api;

  ajax(url, method, data) {
    return this.get('api').request(url, method, data);
  }

  findAll(store, type, sinceToken) {
    return this.ajax(this.buildUrlFindAll(), 'GET');
  }

  findRecord(store, type, id, snapshot) {
    return this.ajax(this.buildUrlFindRecord(id), 'GET');
  }

  updateRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlUpdateRecord(snapshot.id), 'PATCH', this.serialize(snapshot));
  }
}
