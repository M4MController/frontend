import {
  Model,
  belongsTo,
  hasMany,
} from 'ember-cli-mirage';

export default Model.extend({
  controller: belongsTo('controller'),
  data: hasMany('data'),
});
