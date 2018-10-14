import DS from 'ember-data';
import {service} from '@ember-decorators/service';

export default class extends DS.Adapter {
  @service backend;

  ajax(url, method, data) {
    return this.get('backend').request(url, method, data);
  }

  buildUrlFindAll() {
    return '/v2/user/relations';
  }

  buildUrlFindRecord() {
    return '/v2/user/relations';
  }

  findAll(store, type, sinceToken) {
    return this.ajax(this.buildUrlFindAll(), 'GET');
  }

  findRecord(store, type, id, snapshot) {
    return this.ajax(this.buildUrlFindRecord(id), 'GET');
  }
}
