import DS from 'ember-data';

const {
  attr,
  hasMany,
} = DS;

export default class extends DS.Model {
  @attr('string') address;
  @attr('string') bankAccount;
  @attr('string') name;
  @attr('string') phone;
  @hasMany('sensor', {async: false}) sensors;
}
