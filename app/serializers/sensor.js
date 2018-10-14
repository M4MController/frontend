import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    sensorType: 'sensor_type',
    deactivationDate: 'deactivation_date',
    company: 'company',
    activationDate: 'activation_date',
    value: 'last_value',
    controller: 'controller_id',
  };
}
