import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

const sensorsConfig = {
  'hcs': {
    globalClassNames: [
      'col-lg-4',
      'col-md-6',
      'col-sm-6',
      'col-xs-12',
    ],
    layoutName: 'hcs',
  },
  'obd': {
    globalClassNames: [
      'col-lg-12',
      'col-md-12',
      'col-sm-12',
      'col-xs-12',
    ],
    layoutName: 'obd',
  },
};

const getSensorConfigByType = function(type) {
  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
      return sensorsConfig['hcs'];
    // todo: добавить gps после того, как на бекенде будет разделение на типы сенсоров
    case 0:
    case undefined:
      return sensorsConfig['obd'];
  }
};

export default class extends Component {
  @computed('sensor.type')
  get globalClassNames() {
    return getSensorConfigByType(this.get('sensor.type')).globalClassNames;
  }

  @computed('sensor.type')
  get layoutName() {
    return `components/sensor-${getSensorConfigByType(this.get('sensor.type')).layoutName}-card`;
  }
}
