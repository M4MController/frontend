import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
    name: 'name',
    address: 'addres',
    user: 'user_id',
  };
}
