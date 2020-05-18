import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlUpdateRecord(id) {
    return `/sensor/${id}`;
  }
}
