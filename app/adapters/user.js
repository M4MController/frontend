import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindRecord() {
    return '/user/info';
  }

  buildUrlUpdateRecord() {
    return '/user/info';
  }
}
