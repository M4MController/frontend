import DS from 'ember-data';
const {
  attr,
  belongsTo,
} = DS;
import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';

import {deserialize} from '../transforms/datetime';

export default class extends DS.Model {
  @attr('json') data;
  @attr('string') sign;
  @attr('string') signer;
  @attr('string') hash;
  @belongsTo('sensor', {async: false}) sensor;

  @computed('data.timestamp')
  get timestamp() {
    return deserialize(this.get('data.timestamp'));
  }
  @alias('data.value') value;
}
