import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  relations: [
    'controller',
    'data',
  ],
});
