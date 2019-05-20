import DS from 'ember-data';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default class ControllerModel extends DS.Model {
  @attr('string') name;
  @attr('string') macAddress;
  @attr('string') deactivationDate;
  @attr('string') controllerType;
  @attr('string') activationDate;
  @attr('string') status;
  @attr('string') meta;
  @hasMany('sensor', {async: false}) sensors;
  @belongsTo('object', {async: false}) object;
}
