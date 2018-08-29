import Controller from '@ember/controller';
import {set} from '@ember/object';

Controller.reopen({
  actions: {
    set(obj, property, value) {
      if (value === undefined) {
        value = property;
        property = obj;
        obj = this;
      }
      set(obj, property, value);
    },
  },
});
