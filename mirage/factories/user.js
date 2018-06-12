import {Factory, faker} from 'ember-cli-mirage';

export default Factory.extend({
  familyName: () => faker.name.lastName(),
  secondName: () => faker.name.firstName(),
  dateReceiving: () => faker.date.past(),
  registrationAddress: () => faker.address.streetAddress(),
  mailingAddress: () => faker.address.streetAddress(),
  birthday: () => faker.date.past(),
  email: () => faker.internet.email(),
  sex: () => faker.random.number(0, 1),
  homePhone: () => faker.phone.phoneNumber(),
  mobilePhone: () => faker.phone.phoneNumber(),
  citizenship: () => faker.address.city(),
  // objectIds: () => [1],
});
