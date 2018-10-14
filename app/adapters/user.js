import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/user/user_info';
  }

  buildUrlFindRecord() {
    return '/user/user_info';
  }
}
