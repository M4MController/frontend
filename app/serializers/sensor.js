import ApplicationSerializer from './application';
import DS from 'ember-data';

export default class extends ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {}) {
  attrs = {
    name: 'name',
    deactivationDate: 'deactivation_date',
    company: 'company',
    activationDate: 'activation_date',
    controller: 'controller_id',
    lastValue: 'last_value',
    serviceCompany: {
      embedded: 'always',
    },
  };

  normalize(modelClass, resourceHash) {
    const additional = {
      type: resourceHash['characteristics']['sensor_type'],
      charge: resourceHash['payments']['charge'],
      overpayment: resourceHash['payments']['overpayment'],
      forPayment: resourceHash['payments']['for_payment'],
      unitName: resourceHash['characteristics']['unit_of_measurement'],
      valueMonth: resourceHash['stats']['month'],
      valuePrevYear: resourceHash['stats']['prev_month'],
      valuePrevYearAverage: resourceHash['stats']['prev_year'],
      serviceCompany: resourceHash['finance']['service_company'],
    };

    return super.normalize(modelClass,
      Object.assign(resourceHash, additional),
    );
  }
}
