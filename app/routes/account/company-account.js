import Route from '@ember/routing/route';

export default class extends Route {
  model(params) {
    const companyId = params['company_id'];

    const sensors = this.get('store').peekAll('sensor').filterBy('type', undefined); // удалить костыль после поддержки беком

    return {
      company: this.get('store').peekRecord('service-company', companyId),
      sensors,
    };
  }
}
