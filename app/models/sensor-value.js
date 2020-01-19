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
  @attr('string') hash;
  @belongsTo('sensor', {async: false}) sensor;

  @computed('data.time_stamp')
  get timestamp() {
    return deserialize(this.get('data.time_stamp'));
  }
  @alias('data.value') value;
}
