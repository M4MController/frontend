import DS from 'ember-data';
const {
  attr,
  belongsTo,
} = DS;

export default class extends DS.Model {
  @attr('json') value;
  @attr('datetime') timestamp;
  @attr('string') hash;
  @belongsTo('sensor', {async: false}) sensor;
}
