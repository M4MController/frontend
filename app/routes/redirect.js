import Route from '@ember/routing/route';
import {debug} from '@ember/debug';
import {IS_DEV} from '../constants';

const urls = {
  'landing': '//meter4.me/about',
  'contacts': '//meter4.me/about#contacts',
  'forInvestors': '//meter4.me/about#forInvestors',
};

export default class extends Route {
  templateName = 'application-loading';

  beforeModel(transition) {
    const {to} = transition.to.queryParams;
    const url = urls[to];
    if (url) {
      if (IS_DEV) {
        debug(`Redirect to ${url} was blocked. Redirecting to account.index...`);
        this.transitionTo('account.index');
      } else {
        window.location = urls[to] || '/';
      }
    } else {
      this.transitionTo('index');
    }
  }
}
