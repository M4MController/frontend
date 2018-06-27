import Ember from 'ember';
import DS from 'ember-data';
import {service} from '@ember-decorators/service';

export default class extends DS.RESTAdapter {
  @service backend;

  ajax(url, method, {data}) {
    return this.get('backend').request(url, method, data);
  }

  pathForType(type) {
    return Ember.String.camelize(type);
  }
}
