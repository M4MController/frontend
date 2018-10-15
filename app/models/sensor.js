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
  @attr status;
  @attr company;
  @attr type;
  @attr activationDate;
  @attr deactivationDate;
  @belongsTo controller;

  @computed('type')
  get unitName() {
    switch (+this.get('type')) {
      // electricity
      case 1:
        return 'кВт';
      // cold water
      case 2:
      case 3:
        return 'куб. м';
      // hot water
      // gas
      case 4:
        return 'куб. м';
      default:
        return '';
    }
  }

  @computed('type')
  get valueMonth() {
    switch (+this.get('type')) {
      case 1:
        return 450;
      case 2:
        return 10.82;
      case 3:
        return 10.08;
      case 4:
        return 150;
      default:
        return '';
    }
  }

  @computed('type')
  get valueLastMonth() {
    switch (+this.get('type')) {
      case 1:
        return 350;
      case 2:
        return 8.68;
      case 3:
        return 9.92;
      case 4:
        return 150;
      default:
        return '';
    }
  }

  @computed('type')
  get valueYearAverage() {
    switch (+this.get('type')) {
      case 1:
        return 400;
      case 2:
        return 8.7;
      case 3:
        return 9.1;
      case 4:
        return 140;
      default:
        return '';
    }
  }

  @computed('type', 'valueMonth')
  get totalMonth() {
    return calculateTotal(this.get('valueMonth'), this.get('type'));
  }

  @computed('type', 'valueLastMonth')
  get totalLastMonth() {
    return calculateTotal(this.get('valueLastMonth'), this.get('type'));
  }

  @computed('type', 'valueYearAverage')
  get totalYearAverage() {
    return calculateTotal(this.get('valueYearAverage'), this.get('type'));
  }
}
