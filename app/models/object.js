import DS from 'ember-data';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';
import {computed} from '@ember-decorators/object';

export default class ObjectModel extends DS.Model {
  @attr name;
  @attr address;
  @belongsTo user;
  @attr curMonthAmount;
  @attr lastMonthAmount;
  @attr yearAverageAmount;
  @hasMany('controller') controllers;

  @computed('controllers')
  get sensors() {
    return this.get('controllers').
      toArray().
      map((controller) => controller.get('sensors').toArray()).
      reduce((sensors1, sensors2) => sensors1.concat(sensors2), []);
  }
}
