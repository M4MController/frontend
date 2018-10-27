import {helper} from '@ember/component/helper';
import toPrettyString from '../utils/to-pretty-string';

export function currency([value]) {
  return toPrettyString(value, {fractionDigits: 2}) + ' ₽';
}

export default helper(currency);
