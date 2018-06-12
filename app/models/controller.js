import DS from 'ember-data';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

export default class ControllerModel extends DS.Model {
  @attr name;
  @attr status;
  @attr max;
  @attr meta;
  @hasMany('sensor') sensors;
  @belongsTo object;
}
