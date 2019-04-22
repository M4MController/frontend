import DS from 'ember-data';
import {service} from '@ember-decorators/service';

import {IS_LITE_MODE} from '../constants';

const BaseAdapter = class extends DS.Adapter {
  @service api;

  ajax(url, method, data) {
    return this.get('api').request(url, method, data);
  }
};

const DefaultApplicationAdapter = class extends BaseAdapter {
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
};

// адаптер пустой, тк он не должен вызываться в лайт-моде
// (за исключением случая, когда дочерний адаптер переопределён методами)
const LiteApplicationAdapter = BaseAdapter;

export default IS_LITE_MODE ? LiteApplicationAdapter : DefaultApplicationAdapter;
