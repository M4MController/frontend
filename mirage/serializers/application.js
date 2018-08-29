import {RestSerializer} from 'ember-cli-mirage';
import Ember from 'ember';

const contains = function(array, value) {
  return ~array.indexOf(value);
};

export default class extends RestSerializer {
  relations = [];

  keyForAttribute(attr) {
    return Ember.String.camelize(attr);
  }

  typeKeyForModel(model) {
    return Ember.String.singularize(model.modelName);
  }

  include(request) {
    const includes = request.queryParams['include'] || '';
    if (includes === '*') return this.relations;
    return includes.split(',').filter((relation) => contains(this.relations, relation.trim()));
  }

  normalize(json) {
    const payload = json[this.type];
    for (let prop of Object.keys(payload)) {
      if (payload[prop] && contains(this.relations, prop)) {
        payload[`${prop}Id${payload[prop].constructor === Array ? 's' : ''}`] = payload[prop];
        delete payload[prop];
      }
    }
    return super.normalize(json);
  }
}
