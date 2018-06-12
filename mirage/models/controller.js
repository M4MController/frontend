import {
  Model,
  belongsTo,
  hasMany,
} from 'ember-cli-mirage';

export default Model.extend({
  object: belongsTo('object'),
  sensors: hasMany('sensor'),
});
