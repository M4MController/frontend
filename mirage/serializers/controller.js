import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  relations = [
    'object',
    'sensors',
  ];
}

