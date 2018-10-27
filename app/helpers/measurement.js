import {helper} from '@ember/component/helper';
import toPrettyString from '../utils/to-pretty-string';

export function measurement([value, unitName]) {
  value = toPrettyString(value);
  if (!unitName) {
    return value;
  }
  return `${value} ${unitName}`;
}

export default helper(measurement);
