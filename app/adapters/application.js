import Ember from 'ember';
import DS from 'ember-data';

export default class extends DS.RESTAdapter {
  pathForType(type) {
    return Ember.String.camelize(type);
  }
}
