import {get} from '@ember/object';
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
      type: get(resourceHash, 'characteristics.sensor_type'),
      charge: get(resourceHash, 'payments.charge'),
      overpayment: get(resourceHash, 'payments.overpayment'),
      forPayment: get(resourceHash, 'payments.for_payment'),
      unitName: get(resourceHash, 'characteristics.unit_of_measurement'),
      valueMonth: get(resourceHash, 'stats.month'),
      valuePrevYear: get(resourceHash, 'stats.prev_month'),
      valuePrevYearAverage: get(resourceHash, 'stats.prev_year'),
      serviceCompany: get(resourceHash, 'finance.service_company'),
    };

    return super.normalize(modelClass,
      Object.assign(resourceHash, additional),
    );
  }
}
