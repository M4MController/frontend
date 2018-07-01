import {Factory, faker} from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.address.city().slice(0, 10),
  status: () => faker.random.number(0, 1),
  company: () => faker.company.companyName().slice(0, 16),
  activationDate: () => faker.date.past(),
  deactivationDate: () => faker.date.past(),
  value: () => faker.random.number(10000),
  curMonthAmount: () => faker.random.number(5000),
  lastMonthAmount: () => faker.random.number(5000),
  yearAverageAmount: () => faker.random.number(5000),
  accural: () => faker.random.number(1000),
  overpay: () => faker.random.number(1000),
  summary: () => faker.random.number(1000),
});
