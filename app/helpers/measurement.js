import {helper} from '@ember/component/helper';

export function measurement([value, unitName]) {
  if (!unitName) {
    return value;
  }
  return `${value.toPrettyString({fractionDigits: 3})} ${unitName}`;
}

export default helper(measurement);
