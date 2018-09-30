import Service from '@ember/service';
import {sendEvent} from '@ember/object/events';
import {computed} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';

import config from '../config/environment';

export default class extends Service {
  @service ajax;
  @service auth;

  _rawHost = config.APP.backend.host;
  _rawNamespace = config.APP.backend.namespace;

  @computed('_rawNamespace')
  get namespace() {
    const _rawNamespace = this.get('_rawNamespace');
    if (!_rawNamespace) {
      return '';
    }
    return `/${_rawNamespace.replace(/^[/]+|[/]+$/g, '')}`; // trim '/'
  }

  @computed('_rawHost')
  get host() {
    const _rawHost = this.get('_rawHost');

    const parser = document.createElement('a');
    parser.href = _rawHost || '';

    return `${parser.protocol}//${parser.host}`;
  }

  /**
   * Sends a request to the server.
   *
   * @param {String} path Url path without prefix
   * @param {String} method HTTP method
   * @param {Object} data Payload serializing into JSON
   * @return {Promise<Object>}
   */
  async request(path, method, data) {
    return this.get('ajax').request(this.buildUrl(path), {
      method: method,
      data: data,
      contentType: 'application/json',
    }).then((response) => {
      this.set('auth.isAuthorized', true);
      return response;
    }).catch((e) => {
      if (e.status === 401) {
        this.set('auth.isAuthorized', false);
        sendEvent(this, 'log-in-required');
      }
      throw e;
    });
  }

  buildUrl(path) {
    const parser = document.createElement('a');
    parser.href = path;
    return `${this.get('host')}${this.get('namespace')}${parser.pathname}${parser.search}`;
  }
}
