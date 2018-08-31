import Component from '@ember/component';
import {get, set} from '@ember/object';

Component.reopen({
  actions: {
    toggle(obj, property) {
      if (!property) {
        property = obj;
        obj = this;
      }
      set(obj, property, !get(obj, property));
    },

    transitionToRoute(route, ...args) {
      this.get('router').transitionTo(route, ...(args.slice(0, args.length - 1)));
    },
  },
});
