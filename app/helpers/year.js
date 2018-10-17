import {helper} from '@ember/component/helper';

export function year([offset = 0]) {
  return new Date().getFullYear() + offset;
}

export default helper(year);
