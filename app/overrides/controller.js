import Ember from 'ember';
import {get, set} from '@ember/object';
import {action} from '@ember-decorators/object';

Ember.Controller = class extends Ember.Controller {
  @action
  set(obj, property, value) {
    if (value === undefined) {
      value = property;
      property = obj;
      obj = this;
    }
    set(obj, property, value);
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
