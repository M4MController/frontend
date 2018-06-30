import {
  Factory,
  faker,
} from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.address.country(),
  address: () => faker.address.streetAddress(),
  curMonthAmount: () => faker.random.number(0, 5000),
  lastMonthAmount: () => faker.random.number(0, 5000),
  yearAverageAmount: () => faker.random.number(0, 5000),
});
