import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const DefaultControllerAdapter = class extends ApplicationAdapter {
  buildUrlCreateRecord(store, type, snapshot) {
    return `/v2/controller/${snapshot.id}/activate`;
  }

  buildUrlDeleteRecord(store, type, snapshot) {
    return `/v2/controller/${snapshot.id}/activate`;
  }

  createRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlCreateRecord(store, type, snapshot), 'POST', this.serialize(snapshot));
  }

  deleteRecord(store, type, snapshot) {
    return this.ajax(this.buildUrlDeleteRecord(store, type, snapshot), 'DELETE');
  }
};

const LiteControllerAdapter = ApplicationAdapter;

export default IS_LITE_MODE ? LiteControllerAdapter : DefaultControllerAdapter;
