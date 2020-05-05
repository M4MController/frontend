import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const DefaultUserAdapter = class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/user/user_info';
  }

  buildUrlFindRecord() {
    return '/user/user_info';
  }
};

const LiteUserAdapter = class extends ApplicationAdapter {
  buildUrlFindRecord() {
    return '/user/info';
  }

  buildUrlUpdateRecord() {
    return '/user/info';
  }
};

export default IS_LITE_MODE ? LiteUserAdapter : DefaultUserAdapter;
