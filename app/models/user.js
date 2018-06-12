import DS from 'ember-data';
import {
  attr,
  hasMany,
} from '@ember-decorators/data';

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
}
