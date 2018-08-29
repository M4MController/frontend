import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  relations = [
    'user',
    'controllers',
  ];
}
