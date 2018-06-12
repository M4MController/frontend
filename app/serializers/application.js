import Ember from 'ember';
import DS from 'ember-data';

export default class extends DS.RESTSerializer {
  keyForAttribute(attr) {
    return Ember.String.camelize(attr);
  }

  payloadKeyFromModelName(modelName) {
    return modelName;
  }
}
