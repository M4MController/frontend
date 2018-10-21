import {helper} from '@ember/component/helper';

export function currency([value]) {
  return value.toPrettyString({fractionDigits: 2}) + ' ₽';
}

export default helper(currency);
