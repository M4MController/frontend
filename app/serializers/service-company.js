import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    address: 'address',
    bankAccount: 'bank_account_id',
    name: 'name',
    phone: 'phone',
  };
}
