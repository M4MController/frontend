import ApplicationAdapter from './application';

export default class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/user_social_tokens';
  }

  buildUrlFindRecord() {
    return '/user_social_tokens';
  }

  buildUrlUpdateRecord() {
    return '/user_social_tokens';
  }
}
