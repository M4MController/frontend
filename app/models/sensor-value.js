import DS from 'ember-data';
import {
  attr,
  belongsTo,
} from '@ember-decorators/data';

export default class extends DS.Model {
  @attr('number') value;
  @attr('date') date;
  @attr hash;
  @belongsTo({async: false}) sensor;
}
