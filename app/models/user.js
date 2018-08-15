import DS from 'ember-data';
import {
  attr,
  hasMany,
} from '@ember-decorators/data';
import {computed} from '@ember-decorators/object';

export default class UserModel extends DS.Model {
  @attr familyName;
  @attr secondName;
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
  @hasMany('object') objects;

  @computed('familyName', 'secondName')
  get fullName() {
    return `${this.get('familyName')} ${this.get('secondName')}`;
  }
}
