import DS from 'ember-data';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

export default class SensorModel extends DS.Model {
  @attr name;
  @attr status;
  @attr company;
  @attr activationDate;
  @attr deactivationDate;
  @hasMany('data') data;
  @belongsTo sensor;
}
