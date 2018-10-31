import DS from 'ember-data';
import {
  attr,
  hasMany,
} from '@ember-decorators/data';
import {computed} from '@ember-decorators/object';

export default class UserModel extends DS.Model {
  @attr firstName;
  @attr lastName;
  @attr middleName;
  @attr dateReceiving;
  @attr issuedBy;
  @attr divisionNumber;
  @attr registrationAddress;
  @attr mailingAddress;
  @attr birthday;
  @attr sex;
  @attr homePhone;
  @attr mobilePhone;
  @attr citizenship;
  @attr email;
  @hasMany('object', {async: false}) objects;

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.get('firstName')} ${this.get('lastName')} ${this.get('middleName')}`;
  }
}
