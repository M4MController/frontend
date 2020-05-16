import Ember from 'ember';
import {action} from '@ember/object';

import {IS_LITE_MODE} from '../constants';

Ember.Component = class extends Ember.Component {
  isLiteMode = IS_LITE_MODE;

  getAttr(prop) {
    const attrValue = this.get(prop);
    return attrValue === undefined ? this.defaultAttrs[prop] : attrValue;
  }

  @action
  setProp(property, value) {
    this.set(property, value);
  }

  @action
  toggle(obj, property) {
    if (!property) {
      property = obj;
      obj = this;
    }
    obj.set(obj, property, !obj.get(obj, property));
  }

  @action
  transitionToRoute(route, ...args) {
    this.get('router').transitionTo(route, ...(args.slice(0, args.length - 1)));
  }
};
