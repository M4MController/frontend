import Route from '@ember/routing/route';

export default class extends Route {
  model(params) {
    const companyId = params['company_id'];

    // todo: изменить на gps после того, как на бекенде будет разделение на типы сенсоров
    const sensors = this.get('store').peekAll('sensor').filterBy('type', 0);

    return {
      company: this.get('store').peekRecord('service-company', companyId),
      sensors,
    };
  }
}
