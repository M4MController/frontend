import DS from 'ember-data';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

export default class ObjectModel extends DS.Model {
  @attr name;
  @attr address;
  @belongsTo user;
  @attr curMonthAmount;
  @attr lastMonthAmount;
  @attr yearAverageAmount;
  @hasMany('controller') controllers;
}
