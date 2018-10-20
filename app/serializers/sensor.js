import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    deactivationDate: 'deactivation_date',
    company: 'company',
    activationDate: 'activation_date',
    // value: 'last_value',
    controller: 'controller_id',
  };

  normalize(modelClass, resourceHash) {
    const additional ={
      type: resourceHash['characteristics']['sensor_type'],
      unitName: resourceHash['characteristics']['unit_of_measurement'],
      valueMonth: resourceHash['stats']['month'],
      valuePrevYear: resourceHash['stats']['prev_month'],
      valuePrevYearAverage: resourceHash['stats']['prev_year'],
    };

    return super.normalize(modelClass,
      Object.assign(resourceHash, additional));
  }
}
