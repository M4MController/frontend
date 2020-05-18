import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindRecord() {
    return '/admin/companies';
  }

  buildUrlFindAll() {
    return '/admin/companies';
  }
}
