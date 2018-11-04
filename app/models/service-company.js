import DS from 'ember-data';
import {attr, hasMany} from '@ember-decorators/data';

export default class extends DS.Model {
  @attr address;
  @attr bankAccount;
  @attr name;
  @attr phone;
  @hasMany({async: false}) sensors;
}
