import DS from 'ember-data';
import {computed} from '@ember/object';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

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

export default class extends DS.Model {
  @attr('string') name;

  @attr('number') overpayment;
  @attr('number') charge;
  @attr('number') forPayment;

  @attr('raw') lastValue;

  @attr('string') valueMonth;
  @attr('string') valuePrevYear;
  @attr('string') valuePrevYearAverage;

  @attr('number') status;
  @attr('string') company;
  @attr('string') unitName;
  @attr('number') type;
  @attr('date') activationDate;
  @attr('date') deactivationDate;
  @belongsTo('service-company', {async: false}) serviceCompany;
  @belongsTo('controller', {async: false}) controller;
  @hasMany('sensor-value', {async: false}) values;

  @computed('lastValue', 'values.lastObject.value')
  get value() {
    return this.get('lastValue') || this.get('values.lastObject.value');
  }

  // возможно все свойства total* и valueForecast надо будет вырезать
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

  @computed('type', 'value.lat', 'value.lon')
  get typeName() {
    switch (this.get('type')) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 'hcs';
      case 0:
      case undefined:
        // todo: починить после https://github.com/M4MController/backend/issues/37
        return this.get('value.lon') && this.get('value.lat') ? 'gps' : 'obd';
    }
    return undefined;
  }
}
