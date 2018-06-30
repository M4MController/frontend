import {Factory, faker} from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.address.city(),
  status: () => faker.random.number(0, 1),
  company: () => faker.company.companyName(),
  activationDate: () => faker.date.past(),
  deactivationDate: () => faker.date.past(),
  value: () => faker.random.number(0, 10000),
});
