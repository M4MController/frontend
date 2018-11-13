import {helper} from '@ember/component/helper';

export function sensorIconName(sensor) {
  sensor = sensor.length ? sensor[0] : sensor;
  switch (+sensor.get('type')) {
    case 1:
      return 'electricity';
    case 2:
    case 3:
      return 'water';
    case 4:
      return 'gas';
    default:
      return 'sensor';
  }
}

export default helper(sensorIconName);
