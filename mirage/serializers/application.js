import {RestSerializer} from 'ember-cli-mirage';
import Ember from 'ember';

export default RestSerializer.extend({
  relations: [],

  keyForAttribute(attr) {
    return Ember.String.camelize(attr);
  },

  typeKeyForModel(model) {
    return Ember.String.singularize(model.modelName);
  },

  include(request) {
    const includes = request.queryParams['include'] || '';
    if (includes === '*') return this.relations;
    return includes.split(',').filter((relation) => ~this.relations.indexOf(relation.trim()));
  },
});
