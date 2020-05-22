import DS from 'ember-data';
import {computed} from '@ember/object';

const {
  attr,
  hasMany,
} = DS;

export default class UserModel extends DS.Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') middleName;
  @attr('string') dateReceiving;
  @attr('string') issuedBy;
  @attr('string') divisionNumber;
  @attr('string') registrationAddress;
  @attr('string') mailingAddress;
  @attr('string') birthday;
  @attr('number') sex;
  @attr('string') homePhone;
  @attr('string') mobilePhone;
  @attr('string') citizenship;
  @attr('string') email;
  @attr('string') encryptionKey;
  @hasMany('object') objects;

  @computed('firstName', 'lastName')
  get fullName() {
    return [this.get('firstName'), this.get('lastName'), this.get('middleName')].filter((x) => x).join(' ');
  }
}
