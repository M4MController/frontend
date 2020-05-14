import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/objects';
  }

  buildUrlUpdateRecord(id) {
    return `/sensor/${id}`;
  }
}
