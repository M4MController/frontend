import {helper} from '@ember/component/helper';

import monthNameUtil from '../utils/month-name';

export function month([monthNumber]) {
  return monthNameUtil(monthNumber);
}

export default helper(month);
