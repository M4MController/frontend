import DS from 'ember-data';

export default class extends DS.Transform {
  deserialize(serialized) {
    if (typeof serialized === 'object') {
      return serialized;
    } else {
      try {
        return JSON.parse(serialized);
      } catch (e) {
        return serialized;
      }
    }
  }

  serialize(deserialized) {
    return deserialized;
  }
}
