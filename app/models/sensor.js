import DS from 'ember-data';
import {
  attr,
  belongsTo,
} from '@ember-decorators/data';
import {computed} from '@ember-decorators/object';

const calculateTotal = function(value, type) {
  switch (+type) {
    case 1:
      return value * 4.3;
    case 2:
      return value * 60.52;
    case 3:
      return value * 180.55;
    case 4:
      return value * 6.40;
    default:
      return '';
  }
};

export default class SensorModel extends DS.Model {
  @attr name;

  @attr valueMonth;
  @attr valuePrevYear;
  @attr valuePrevYearAverage;

  @attr status;
  @attr company;
  @attr unitName;
  @attr type;
  @attr activationDate;
  @attr deactivationDate;
  @belongsTo controller;

  @computed('valueMonth', 'type')
  get valueForecast() {
    return this.get('valueMonth') * (1 + (+this.get('type') / 7));
  }

  @computed('type', 'valueMonth')
  get totalMonth() {
    return calculateTotal(this.get('valueMonth'), this.get('type'));
  }

  @computed('type', 'valuePrevYear')
  get totalPrevMonth() {
    return calculateTotal(this.get('valuePrevYear'), this.get('type'));
  }

  @computed('type', 'valuePrevYearAverage')
  get totalYearAverage() {
    return calculateTotal(this.get('valuePrevYearAverage'), this.get('type'));
  }

  @computed('type', 'valueForecast')
  get totalForecast() {
    return calculateTotal(this.get('valueForecast'), this.get('type'));
  }
}
