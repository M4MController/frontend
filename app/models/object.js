import DS from 'ember-data';
import {computed} from '@ember-decorators/object';
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

  @computed('controllers.@each.sensors.totalMonth')
  get totalMonth() {
    let result = 0;
    for (let controller of this.get('controllers').toArray()) {
      for (let sensor of controller.get('sensors').toArray()) {
        result += +sensor.get('totalMonth');
      }
    }
    return result;
  }

  @computed('controllers.@each.sensors.totalLastMonth')
  get totalLastMonth() {
    let result = 0;
    for (let controller of this.get('controllers').toArray()) {
      for (let sensor of controller.get('sensors').toArray()) {
        result += +sensor.get('totalLastMonth');
      }
    }
    return result;
  }


  @computed('controllers.@each.sensors.totalYearAverage')
  get totalYearAverage() {
    let result = 0;
    for (let controller of this.get('controllers').toArray()) {
      for (let sensor of controller.get('sensors').toArray()) {
        result += +sensor.get('totalYearAverage');
      }
    }
    return result;
  }
}
