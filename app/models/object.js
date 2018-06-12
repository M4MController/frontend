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
  @hasMany('controller') controllers;
}
