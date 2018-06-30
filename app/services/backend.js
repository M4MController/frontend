import Service from '@ember/service';
import {computed} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import config from '../config/environment';

export default class extends Service {
  @service ajax;

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

  request(path, method, data) {
    return this.get('ajax').request(this.buildUrl(path), {
      method: method,
      data: data,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  buildUrl(path) {
    const parser = document.createElement('a');
    parser.href = path;
    return `${this.get('host')}${this.get('namespace')}${parser.pathname}${parser.search}`;
  }
}
