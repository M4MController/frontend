import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    macAddress: 'mac',
    deactivationDate: 'deactivation_date',
    controllerType: 'controller_type',
    object: 'object_id',
    activationDate: 'activation_date',
    meta: 'meta',
    status: 'status',
  };
}
