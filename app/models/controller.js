import DS from 'ember-data';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

export default class ControllerModel extends DS.Model {
  @attr name;
  @attr macAddress;
  @attr deactivationDate;
  @attr controllerType;
  @attr activationDate;
  @attr status;
  @attr meta;
  @hasMany('sensor') sensors;
  @belongsTo object;
}
