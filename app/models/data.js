import DS from 'ember-data';
import {
  attr,
  belongsTo,
} from '@ember-decorators/data';

export default class DataModel extends DS.Model {
  @attr date;
  @attr hash;
  @attr value;
  @belongsTo sensor;
}
