import DS from 'ember-data';
import {computed} from '@ember-decorators/object';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

const calculateSumForSensors = function(this_, property) {
  let result = 0;
  for (const controller of this_.get('controllers').toArray()) {
    for (const sensor of controller.get('sensors').toArray()) {
      result += +sensor.get(property);
    }
  }
  return result;
};

export default class ObjectModel extends DS.Model {
  @attr name;
  @attr address;
  @belongsTo({async: false}) user;
  @hasMany('controller', {async: false}) controllers;

  @computed('sensors')
  get totalMonth() {
    return calculateSumForSensors(this, 'totalMonth');
  }

  @computed('sensors')
  get totalPrevMonth() {
    return calculateSumForSensors(this, 'totalPrevMonth');
  }

  @computed('sensors')
  get totalYearAverage() {
    return calculateSumForSensors(this, 'totalYearAverage');
  }

  @computed('sensors')
  get totalForecast() {
    return calculateSumForSensors(this, 'totalForecast');
  }

  @computed('controllers.@each.sensors')
  get sensors() {
    return this.get('controllers').mapBy('sensors').reduce((a, b) => a.concat(b.toArray()), []);
  }
}
