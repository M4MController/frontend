import Service from '@ember/service';
import {sendEvent} from '@ember/object/events';
import {inject as service} from '@ember/service';

export default class extends Service {
  @service ajax;
  @service auth;

  baseUrl = '/';
  sendToken = true;

  /**
   * Sends a request to the server.
   *
   * @param {String} path Url path without prefix
   * @param {String} method HTTP method
   * @param {Object} data Payload serializing into JSON
   * @param {Object} options jquery ajax options
   * @return {Promise<Object>}
   */
  async request(path, method, data, options = {}) {
    const contentType = method === 'POST' ? 'application/json' : undefined;

    return this.get('ajax').request(
      this.buildUrl(
        path,
        this.get('sendToken') ? {token: this.get('auth.token')} : undefined,
      ),
      Object.assign({
        method: method,
        data,
        contentType,
      }, options)).then((response) => {
      this.set('auth.isAuthorized', true);
      return response;
    }).catch((e) => {
      if (e.status === 401) {
        this.set('auth.isAuthorized', false);
        sendEvent(this.get('auth'), 'log-in-required');
      }
      throw e;
    });
  }

  buildUrl(path, queryParams) {
    let url = `${this.get('baseUrl')}${path}`;
    if (queryParams) {
      url += `?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    return url;
  }
}
