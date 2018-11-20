import Ember from 'ember';
import {get, set} from '@ember/object';
import {action} from '@ember-decorators/object';

Ember.Controller = class extends Ember.Controller {
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
    set(obj, property, !get(obj, property));
  }
};
