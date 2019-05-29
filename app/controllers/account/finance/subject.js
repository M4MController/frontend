import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default class extends Controller {
  @computed('model.sensors.@each.serviceCompany')
  get serviceCompanies() {
    const serviceCompanies = this.get('model.sensors').mapBy('serviceCompany').uniqBy('id');

    return serviceCompanies.map((serviceCompany) => {
      const sensors = this.get('model.sensors').filterBy('serviceCompany.id', serviceCompany.get('id'));

      return {
        item: serviceCompany,
        sensors,
        forPayment: sensors.reduce((a, b) => a + b.get('forPayment'), 0),
      };
    });
  }
}
