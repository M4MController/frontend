import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/objects';
  }
}
