import Route from '@ember/routing/route';

const urls = {
  'landing': '//meter4.me/about',
  'contacts': '//meter4.me/about#contacts',
  'forInvestors': '//meter4.me/about#forInvestors',
};

export default class extends Route {
  templateName = 'application-loading';

  beforeModel({queryParams: {to}}) {
    const url = urls[to];
    if (url) {
      window.location = urls[to] || '/';
    } else {
      this.transitionTo('index');
    }
  }
}
