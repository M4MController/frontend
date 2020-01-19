import DS from 'ember-data';

const re = /(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/;

export const deserialize = function(serialized) {
  const date = new Date(serialized);
  if (!date.getDate()) {
    const props = re.exec(serialized);
    return new Date(props[1], props[2] - 1, props[3], props[4], props[5], props[6]);
  } else {
    return date;
  }
};

export default class extends DS.Transform {
  deserialize(serialized) {
    return deserialize(serialized);
  }

  serialize(deserialized) {
    return deserialized;
  }
}
