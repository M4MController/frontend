import {Factory, faker} from 'ember-cli-mirage';

export default Factory.extend({
  name: () => faker.name.title(),
  status: () => faker.random.number(0, 1),
});

