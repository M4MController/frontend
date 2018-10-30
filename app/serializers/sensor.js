import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    deactivationDate: 'deactivation_date',
    company: 'company',
    activationDate: 'activation_date',
    controller: 'controller_id',
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
    };

    return super.normalize(modelClass,
      Object.assign(resourceHash, additional));
  }
}
