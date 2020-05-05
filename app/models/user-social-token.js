import DS from 'ember-data';

const {attr} = DS;

export default class extends DS.Model {
  @attr('string') yandexDisk;
}
