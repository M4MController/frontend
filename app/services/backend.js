import Service from '@ember/service';
import {sendEvent} from '@ember/object/events';
import {computed} from '@ember-decorators/object';
import {alias} from '@ember-decorators/object/computed';
import {service} from '@ember-decorators/service';

import config from '../config/environment';

export default class extends Service {
  @service ajax;
  @service auth;

  _rawHost = config.APP.backend.host;
  _rawNamespace = config.APP.backend.namespace;

  @alias('auth.token') token;

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
   * @param {Object} options jquery ajax options
   * @return {Promise<Object>}
   */
  async request(path, method, data, options = {}) {
    const contentType = method === 'POST' ? 'application/json' : undefined;

    return this.get('ajax').request(this.buildUrl(path, {token: this.get('token')}), Object.assign({
      method: method,
      data,
      contentType,
    }, options)).then((response) => {
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

  buildUrl(path, queryParams) {
    const parser = document.createElement('a');
    if (queryParams) {
      path += `?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
    }
    parser.href = path;
    return `${this.get('host')}${this.get('namespace')}${parser.pathname}${parser.search}`;
  }
}
