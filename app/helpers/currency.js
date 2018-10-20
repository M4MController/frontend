import {helper} from '@ember/component/helper';

export function currency([value]) {
  return value.toLocaleString(undefined, {maximumFractionDigits: 2}) + ' ₽';
}

export default helper(currency);
