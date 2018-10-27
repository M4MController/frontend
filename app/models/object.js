import DS from 'ember-data';
import {computed} from '@ember-decorators/object';
import {
  attr,
  belongsTo,
  hasMany,
} from '@ember-decorators/data';

const calculateSumForSensors = function(this_, property) {
  let result = 0;
  for (let controller of this_.get('controllers').toArray()) {
    for (let sensor of controller.get('sensors').toArray()) {
      result += +sensor.get(property);
    }
  }
  return result;
};

export default class ObjectModel extends DS.Model {
  @attr name;
  @attr address;
  @belongsTo user;
  @hasMany('controller') controllers;

  @computed('controllers.@each.sensors.@each.totalMonth')
  get totalMonth() {
    return calculateSumForSensors(this, 'totalMonth');
  }

  @computed('controllers.@each.sensors.@each.totalPrevMonth')
  get totalPrevMonth() {
    return calculateSumForSensors(this, 'totalPrevMonth');
  }

  @computed('controllers.@each.sensors.@each.totalYearAverage')
  get totalYearAverage() {
    return calculateSumForSensors(this, 'totalYearAverage');
  }

  @computed('controllers.@each.sensors.@each.totalForecast')
  get totalForecast() {
    return calculateSumForSensors(this, 'totalForecast');
  }
}
