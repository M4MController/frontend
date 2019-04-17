import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const DefaultObjectAdapter = class extends ApplicationAdapter {
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
};

const LiteObjectAdapter = class extends ApplicationAdapter {
  async findAll() {
    const sensors = await this.ajax('/data');

    const OBJECT_ID = 3;
    const CONTROLLER_ID = 1;

    const objects = {
      'id': OBJECT_ID,
      'name': 'Mercedes Benz C 180',
      'user_id': 1,
      'address': 'МКАД 75км',
    };
    const controllers = {
      'id': 1,
      'mac': '00:00:00:00:00:02',
      'meta': '',
      'name': 'M4M controller for a car',
      'object_id': OBJECT_ID,
    };

    sensors.forEach((sensor) => sensor['controller_id'] = CONTROLLER_ID);

    return {objects, controllers, sensors};
  }
};

export default IS_LITE_MODE ? LiteObjectAdapter : DefaultObjectAdapter;
