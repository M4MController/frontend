import Route from '@ember/routing/route';

export default class extends Route {
  model(params) {
    const companyId = params['company_id'];
    return this.get('store').peekRecord('service-company', companyId);
  }
}
